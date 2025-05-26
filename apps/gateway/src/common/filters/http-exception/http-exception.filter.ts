// http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception.getResponse();
        let message: string | string[];
        
        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else {
            const resp = exceptionResponse as any;
            message = resp.message || 'Unexpected error';
            
            if (Array.isArray(message)) {
                message = message.map(msg => {
                    return msg.replace(/\.\d+\./g, ' item ');
                });
            }
        }

        response.status(status).send({
            statusCode: status,
            message: message,
            data: {} 
        });
    }
}