import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const { method, url, ip } = request;
        const userAgent = request.headers['user-agent'] || '';
        const controllerName = context.getClass().name;
        const handlerName = context.getHandler().name;

        this.logger.log(
            `[${controllerName}] ${method} ${url} - ${handlerName}() - ${ip} - ${userAgent}`,
        );

        const now = Date.now();
        return next.handle().pipe(
            tap({
                next: data => {
                    const response = context.switchToHttp().getResponse();
                    const statusCode = response.statusCode;
                    const responseTime = Date.now() - now;

                    this.logger.log(
                        `[${controllerName}] ${method} ${url} - ${statusCode} - ${responseTime}ms`,
                    );

                    if (process.env.NODE_ENV === 'development') {
                        // Log detailed response data in development only
                        this.logger.debug(
                            `Response data: ${
                                typeof data === 'object' ? JSON.stringify(data, null, 2) : data
                            }`,
                        );
                    }
                },
                error: error => {
                    const statusCode = error.status || 500;
                    const responseTime = Date.now() - now;

                    this.logger.error(
                        `[${controllerName}] ${method} ${url} - ${statusCode} - ${responseTime}ms - ${error.message}`,
                        error.stack,
                    );
                },
            }),
        );
    }
}
