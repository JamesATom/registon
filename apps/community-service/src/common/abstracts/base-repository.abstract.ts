// base-repository.abstract.ts
// import { IRepository } from 'src/common/interfaces/base-repository.interface';

export abstract class BaseRepository<T> {
    constructor(protected readonly model: any) {}
}
