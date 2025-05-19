export interface ErrorResponse {
    statusCode: number;
    message: string;
    error?: string;
    details?: any;
    data?: any;
}

export interface SuccessResponse<T = any> {
    statusCode: number;
    data: T;
    message?: string;
}

export interface PaginateResult<T> {
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
