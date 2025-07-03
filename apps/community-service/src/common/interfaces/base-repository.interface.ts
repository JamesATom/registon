// base-repository.interface.ts
export interface IRepository<T, C> {
    create(entity: C): Promise<any>;
    getAll(paginationParams?: { page?: number; limit?: number }): Promise<{ data: T[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }>;
    getOne(id: string): Promise<any>;
    update(id: string, updateDto: Partial<C>): Promise<any>;
    delete(id: string): Promise<any>;
}
