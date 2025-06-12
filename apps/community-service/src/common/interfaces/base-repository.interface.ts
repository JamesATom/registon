// base-repository.interface.ts
export interface IRepository<T, C> {
    create(entity: C): Promise<T>;
    getAll(): Promise<T[]>;
    getOne(id: string): Promise<T>;
    update(id: string, updateDto: Partial<C>): Promise<T>;
    delete(id: string): Promise<T>;
}
