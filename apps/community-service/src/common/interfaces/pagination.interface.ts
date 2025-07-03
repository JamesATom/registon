// pagination.interface.ts
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
}
