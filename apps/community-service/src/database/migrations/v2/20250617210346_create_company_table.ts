import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('company', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('companyTitle', 50).notNullable();
        table.string('description', 250).nullable();
        table.string('companyLogo').nullable();

        // Indexes
        table.index('companyTitle');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('company');
}
