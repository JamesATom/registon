// repository.interface.ts
import { QueryOptions } from 'mongoose';

export interface IRepository<T, CreateDto> {
    create(createDto: CreateDto, options?: QueryOptions): Promise<T>;
}