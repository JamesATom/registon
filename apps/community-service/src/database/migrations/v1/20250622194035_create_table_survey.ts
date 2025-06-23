// 20250622194035_create_table_survey.ts
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('survey', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('createdBy').notNullable();
        table.uuid('updatedBy').nullable();
        table.string('image').notNullable();
        table.string('commentAdmin', 250).nullable();
        table.string('title', 100).notNullable();
        table.string('description', 250).nullable();
        table.uuid('branch').notNullable();
        table.enum('targetAudience', ['ALL', 'TEACHER', 'STUDENT']).notNullable();
        table.timestamps(true, true);
        
        table.index('branch');
        table.index('targetAudience');
    });

    await knex.schema.createTable('surveyQuestion', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('surveyId').notNullable();
        table.string('question', 100).notNullable();
        table.string('description', 250).nullable();
        table.string('answer1', 50).notNullable();
        table.string('answer2', 50).notNullable();
        table.string('answer3', 50).nullable();
        table.string('answer4', 50).nullable();
        table.string('answer5', 50).nullable();
        table.integer('answer1Qty').defaultTo(0);
        table.integer('answer2Qty').defaultTo(0);
        table.integer('answer3Qty').defaultTo(0);
        table.integer('answer4Qty').defaultTo(0);
        table.integer('answer5Qty').defaultTo(0);
        
        table.foreign('surveyId').references('id').inTable('survey').onDelete('CASCADE');
        table.index('surveyId');
    });

    await knex.schema.createTable('surveyParticipant', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('surveyId').notNullable();
        table.uuid('userId').notNullable();
        table.timestamp('takenAt').defaultTo(knex.fn.now()).notNullable();
        
        table.foreign('surveyId').references('id').inTable('survey').onDelete('CASCADE');
        table.unique(['surveyId', 'userId']);
        table.index('surveyId');
        table.index('userId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('surveyParticipant');
    await knex.schema.dropTableIfExists('surveyQuestion');
    await knex.schema.dropTableIfExists('survey');
}