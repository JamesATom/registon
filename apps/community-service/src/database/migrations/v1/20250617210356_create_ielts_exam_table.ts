// 20250617210356_create_ielts_exam_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('ieltsExam', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');
        table.timestamp('dateExam').notNullable();
        table.uuid('city').notNullable();
        table.boolean('isActive').defaultTo(true);
        table.string('commentUser', 250);
        table.string('commentAdmin', 250);

        table.index('city');
        table.index('dateExam');
        table.index('isActive');
    });

    await knex.schema.createTable('ieltsRegistrationStudent', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('studentId').notNullable();
        table.uuid('examId').notNullable();
        table.timestamp('registeredAt').defaultTo(knex.fn.now()).notNullable();

        table.foreign('examId').references('id').inTable('ieltsExam').onDelete('CASCADE');

        table.unique(['studentId', 'examId']);

        table.index('studentId');
        table.index('examId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('ieltsRegistrationStudent');
    await knex.schema.dropTableIfExists('ieltsExam');
}
