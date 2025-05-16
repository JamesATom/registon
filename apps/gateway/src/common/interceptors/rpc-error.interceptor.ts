import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NestInterceptor,
    GatewayTimeoutException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';
import { ErrorResponse } from '../interfaces/service-response.interface';

@Injectable()
export class RpcErrorInterceptor implements NestInterceptor {
    private readonly logger = new Logger(RpcErrorInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(err => {
                this.logger.error(`Error caught in RpcErrorInterceptor: ${err.message}`, err.stack);

                if (
                    err?.response &&
                    typeof err.response === 'object' &&
                    err.response.status === 'error'
                ) {
                    const errorResponse = err.response as ErrorResponse;
                    throw new HttpException(
                        {
                            message: errorResponse.message,
                            error: errorResponse.error || 'Error',
                            statusCode: errorResponse.statusCode,
                        },
                        errorResponse.statusCode,
                    );
                }

                if (err instanceof TimeoutError) {
                    throw new GatewayTimeoutException('Service timeout');
                }

                if (err instanceof HttpException) {
                    throw err;
                }

                this.logger.error('Unhandled error', err.stack);
                this.logger.error('Error details:', JSON.stringify(err, null, 2));
                throw new InternalServerErrorException(
                    `Internal server error: ${err.message || 'Unknown error'}`,
                );
            }),
        );
    }
}
