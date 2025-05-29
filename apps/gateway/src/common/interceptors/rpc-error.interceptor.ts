// rpc-error.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
    GatewayTimeoutException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TimeoutError } from 'rxjs';

@Injectable()
export class RpcErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(err => {
                if (err?.response && typeof err.response === 'object') {
                    const errorResponse = err.response;

                    if (errorResponse.statusCode) {
                        throw new HttpException(
                            {
                                statusCode: errorResponse.statusCode,
                                message: errorResponse.message,
                                data: errorResponse.data || {},
                            },
                            errorResponse.statusCode,
                        );
                    }
                }

                if (err instanceof TimeoutError) {
                    throw new GatewayTimeoutException('Service timeout');
                }

                if (err instanceof HttpException) {
                    throw err;
                }

                throw new InternalServerErrorException(
                    `Internal server error: ${err.message || 'Unknown error'}`,
                );
            }),
        );
    }
}
