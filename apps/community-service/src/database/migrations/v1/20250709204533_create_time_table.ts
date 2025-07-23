// 20250709204533_create_time_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('timetable', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').nullable();
        table.string('updatedBy').nullable();

        table.string('supportTeacherId').nullable();
        table.string('branchId').notNullable();

        table
            .enum('weekday', ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
            .notNullable();
        table.string('commentUser', 250).nullable();
        table.time('timeFrom').notNullable();
        table.time('timeTo').notNullable();
    });

    await knex.schema.createTable('calendar', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.datetime('dateCreate').notNullable();
        table.datetime('date').notNullable();
        table
            .enum('weekday', ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
            .notNullable();
        table.time('timeFrom').notNullable();
        table.time('timeTo').notNullable();
        table.string('branchId').notNullable();
        table.string('supportTeacherId').nullable();

        table.uuid('timetableId').notNullable().references('id').inTable('timetable');
        table.integer('reservationsNumber').unsigned().nullable();
    });

    await knex.schema.createTable('reservations', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.integer('number').unsigned().notNullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').nullable();
        table.string('updatedBy').nullable();

        table.string('commentUser', 250).nullable();
        table.enum('status', ['RESERVED', 'STUDENT_CANCELLED', 'TEACHER_CANCELLED', 'MISSED']).nullable();
        table.string('studentId').nullable();
        table.uuid('reservationCalendarId').notNullable().references('id').inTable('calendar');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('reservations');
    await knex.schema.dropTableIfExists('calendar');
    await knex.schema.dropTableIfExists('timetable');
}