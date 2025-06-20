// base-repository.interface.ts
export interface IRepository<T, C> {
    create(entity: C): Promise<any>;
    getAll(): Promise<any>;
    getOne(id: string): Promise<any>;
    update(id: string, updateDto: Partial<C>): Promise<any>;
    delete(id: string): Promise<any>;
}
