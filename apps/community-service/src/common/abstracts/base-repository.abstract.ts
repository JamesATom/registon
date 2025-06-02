// base-repository.abstract.ts
import { Model, Document, QueryOptions } from 'mongoose';
import { IRepository } from 'src/common/interfaces/repository.interface';

export abstract class BaseRepository<T extends Document, C> implements IRepository<T, C> {
    constructor(protected readonly model: Model<T>) {}
    
    async create(createDto: C, options?: QueryOptions): Promise<T> {
        const created = new this.model(createDto);
        return created.save(options);
    }
}

