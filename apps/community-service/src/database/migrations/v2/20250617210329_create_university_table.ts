import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('universities', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('title', 100).notNullable();
        table.string('description', 500).nullable();
        table.timestamp('registrationDate').notNullable();
        table.specificType('type', 'UniType').nullable();
        table.boolean('status').nullable();
        table.string('contract', 100).notNullable();
        table.integer('contacts').nullable();
        table.string('website', 50).nullable();
        table.string('email', 50).nullable();
        table.string('address', 100).nullable();
        table.string('logo').nullable();
        table.string('license').nullable();

        // Foreign keys
        table.uuid('cityId').nullable().references('id').inTable('city');
        table.uuid('certificateRequirementId').nullable().references('id').inTable('certificateRequirements');

        // Indexes
        table.index('cityId');
        table.index('certificateRequirementId');
        table.index('title');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('universities');
}
