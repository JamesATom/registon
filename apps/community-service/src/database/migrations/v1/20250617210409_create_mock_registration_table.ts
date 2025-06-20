// 20250617210409_create_mock_registration_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('mockRegistration', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.string('updatedBy');
        table.string('commentUser');
        table.string('commentAdmin');
        table.string('title');
        table.timestamp('date').notNullable();
        table.string('branchId').notNullable();
        table.boolean('isActive').defaultTo(true).notNullable();

        table.index('date');
        table.index('title');
    });

    await knex.schema.createTable('mockRegistrationStudent', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('studentId').notNullable();
        table.uuid('mockRegistrationId').notNullable().unique();
        table.timestamp('registeredAt').defaultTo(knex.fn.now()).notNullable();

        table.foreign('mockRegistrationId').references('id').inTable('mockRegistration').onDelete('CASCADE');

        table.unique(['studentId', 'mockRegistrationId']);

        table.index('studentId');
        table.index('mockRegistrationId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('mockRegistrationStudent');
    await knex.schema.dropTableIfExists('mockRegistration');
}
