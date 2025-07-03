// base-repository.abstract.ts
import type { Knex } from 'knex';

export abstract class BaseRepository<T, C> {
    protected readonly tableName: string;
    protected readonly knex: Knex;

    constructor(knex: Knex, tableName: string) {
        this.knex = knex;
        this.tableName = tableName;
    }

    async create(dto: C): Promise<any> {
        const created = await this.knex(this.tableName).insert(dto).returning('*');
        return created;
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<{ data: T[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(this.tableName).count('* as count');
        const data = await this.knex(this.tableName)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            pagination: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getOne(id: string): Promise<T | null> {
        const item = await this.knex(this.tableName).where('id', id).first();
        return item || null;
    }

    async update(id: string, dto: Partial<T>): Promise<any> {
        const updated = await this.knex(this.tableName).where('id', id).update(dto).returning('*');
        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.knex(this.tableName).where('id', id).delete();
    }
}
