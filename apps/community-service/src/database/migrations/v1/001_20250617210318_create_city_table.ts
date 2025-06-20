// 20250617210318_create_city_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('city', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name', 100).notNullable().unique();

        table.index('name');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('city');
}
