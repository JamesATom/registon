// all-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CommonEntity } from 'src/common/libs/common.entity';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Unexpected error occurred';
        let errorDetails: any = {};

        if (exception instanceof HttpException) {
            const response = exception.getResponse();

            if (typeof response === 'string') {
                message = response;
            } else if (typeof response === 'object') {
                const res = response as any;
                message = res.message || exception.message || 'Bad Request';

                if (Array.isArray(res.message)) {
                    errorDetails = { validationErrors: res.message };
                }
            }
        }

        const errorResponse: CommonEntity = {
            statusCode: status,
            message,
            data: {
                path: request.url,
                timestamp: new Date().toISOString(),
                ...errorDetails,
                ...(process.env.NODE_ENV === 'development' &&
                    exception instanceof Error && { stack: exception.stack }),
            },
        };

        console.error(`[Error] ${request.method} ${request.url}`, exception);

        reply.status(status).send(errorResponse);
    }
}