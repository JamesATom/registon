import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('faculties', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('facultyTitle', 50).notNullable();
        table.string('description', 250).nullable();

        // Foreign keys
        table.uuid('universityId').notNullable().references('id').inTable('universities').onDelete('CASCADE');

        // Indexes
        table.index('universityId');
        table.index('facultyTitle');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('faculties');
}
