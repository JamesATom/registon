// 20250622000930_create_table_event.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('event', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.string('createdBy').notNullable();
        table.string('updatedBy').nullable();
        table.string('commentAdmin', 250).nullable();
        table.enum('status', ['DRAFT', 'PUBLISHED']).defaultTo('DRAFT').notNullable();
        table.string('branch').notNullable();
        table.string('eventTitle', 250).notNullable();
        table.date('date').notNullable();
        table.string('startTime').notNullable();
        table.string('endTime').nullable();

        table.integer('age').nullable();
        table.string('image').notNullable();
        table.string('description', 250).nullable();
        table.decimal('price', 10, 2).nullable();
        table.enum('targetAudience', ['ALL', 'TEACHER', 'STUDENT']).notNullable();
        table.jsonb('course').nullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();

        table.index('date');
        table.index('branch');
        table.index('status');
        table.index('targetAudience');
    });

    await knex.schema.createTable('eventRegistrationStudent', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('studentId').notNullable();
        table.uuid('eventId').notNullable();
        table.timestamp('registeredAt').defaultTo(knex.fn.now()).notNullable();

        table.foreign('eventId').references('id').inTable('event').onDelete('CASCADE');

        table.unique(['studentId', 'eventId']);
        table.index('studentId');
        table.index('eventId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('eventRegistrationStudent');
    await knex.schema.dropTable('event');
}
