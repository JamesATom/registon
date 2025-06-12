import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MicroserviceLoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('Microservice');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Check if it's microservice context
        if (context.getType() === 'rpc') {
            const rpcContext = context.switchToRpc();
            const data = rpcContext.getData();
            const pattern = rpcContext.getContext();

            // Log incoming message
            this.logger.log(`[MESSAGE] Pattern: ${JSON.stringify(pattern)} - Data: ${JSON.stringify(data)}`);

            const start = Date.now();
            return next.handle().pipe(
                tap(response => {
                    const responseTime = Date.now() - start;

                    // Log response
                    this.logger.log(
                        `[RESPONSE] Pattern: ${JSON.stringify(pattern)} - Time: ${responseTime}ms - Response: ${
                            JSON.stringify(response).substring(0, 100) // Truncate long responses
                        }${JSON.stringify(response).length > 100 ? '...' : ''}`,
                    );
                }),
            );
        }

        // For non-microservice contexts, just proceed
        return next.handle();
    }
}
