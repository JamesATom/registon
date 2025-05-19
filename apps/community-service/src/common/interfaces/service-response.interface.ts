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

export interface PaginateResult<T> {
    status: string;
    statusCode?: number;
    message?: string;
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

export type ServiceResponse<T = any> = ErrorResponse | SuccessResponse<T>;
