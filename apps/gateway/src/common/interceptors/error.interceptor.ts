import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    private readonly logger = new Logger('ErrorHandler');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                const request = context.switchToHttp().getRequest();
                const { method, url } = request;
                const controllerName = context.getClass().name;
                const handlerName = context.getHandler().name;

                // If the error is already an HttpException, just log it
                if (error instanceof HttpException) {
                    this.logger.error(
                        `[${controllerName}.${handlerName}] ${method} ${url} - ${error.getStatus()} - ${error.message}`,
                        error.stack,
                    );
                    return throwError(() => error);
                }

                // Otherwise, create a new HttpException with appropriate message
                const errorMessage = error.message || 'Internal server error';
                const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

                this.logger.error(
                    `[${controllerName}.${handlerName}] ${method} ${url} - ${statusCode} - ${errorMessage}`,
                    error.stack,
                );

                return throwError(
                    () =>
                        new HttpException(
                            {
                                status: 'error',
                                statusCode,
                                message: errorMessage,
                                error: 'Internal Server Error',
                            },
                            statusCode,
                        ),
                );
            }),
        );
    }
}
