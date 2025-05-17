import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../interfaces/service-response.interface';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(RpcExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): ErrorResponse {
        this.logger.error(`Exception caught: ${exception.message}`, exception.stack);

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage = 'Internal server error';
        let errorType = 'InternalServerError';

        // Handle different types of exceptions
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            errorMessage = exception.message;
            errorType = exception.name;
        } else if (exception instanceof RpcException) {
            const error = exception.getError();
            errorMessage = typeof error === 'object' ? error['message'] : error;
            errorType = 'RpcException';
        } else if (exception.name === 'MongoError' || exception.name === 'MongoServerError') {
            errorMessage = `Database error: ${exception.message}`;
            errorType = exception.name;
        }

        // Return standardized error response
        return {
            status: 'error',
            statusCode,
            message: errorMessage,
            error: errorType,
            details: process.env.NODE_ENV === 'production' ? undefined : exception.stack,
        };
    }
}
