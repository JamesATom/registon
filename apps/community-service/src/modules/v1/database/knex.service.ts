// knex.service.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import type { Knex } from 'knex';

@Injectable()
export class KnexService {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    table(tableName: string): Knex.QueryBuilder {
        return this.knex(tableName);
    }

    async transaction(): Promise<Knex.Transaction> {
        return this.knex.transaction();
    }
}
