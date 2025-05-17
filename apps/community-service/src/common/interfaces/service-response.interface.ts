export interface ErrorResponse {
    status: 'error';
    statusCode: number;
    message: string;
    error?: string;
    details?: any;
    data?: any;
}

export interface SuccessResponse<T = any> {
    status: 'success';
    statusCode: number;
    data: T;
    message?: string;
}

export type ServiceResponse<T = any> = ErrorResponse | SuccessResponse<T>;
