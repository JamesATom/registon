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
      catchError((err) => {
        this.logger.error(`Error caught in RpcErrorInterceptor: ${err.message}`, err.stack);
        
        // Handle case when the microservice returns an error response
        if (err?.response && typeof err.response === 'object' && err.response.status === 'error') {
          const errorResponse = err.response as ErrorResponse;
          throw new HttpException(
            {
              message: errorResponse.message,
              error: errorResponse.error || 'Error',
              statusCode: errorResponse.statusCode,
            },
            errorResponse.statusCode
          );
        }

        // Handle RxJS timeout errors
        if (err instanceof TimeoutError) {
          throw new GatewayTimeoutException('Service timeout');
        }

        // Pass through existing HttpExceptions
        if (err instanceof HttpException) {
          throw err;
        }

        // Handle all other errors as internal server errors
        this.logger.error('Unhandled error', err.stack);
        throw new InternalServerErrorException(
          `Internal server error: ${err.message || 'Unknown error'}`
        );
      })
    );
  }
}
