import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('certificateRequirements', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('certificateRequirementsTitle', 50).notNullable();
        table.string('description', 250).nullable();

        // Create indexes
        table.index('certificateRequirementsTitle');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('certificateRequirements');
}
