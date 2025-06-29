// 20250627081720_create_news_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('newsCategory', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy').nullable();

        table.string('categoryTitle', 50).notNullable();
        table.string('description', 250).nullable();
        table.string('image').nullable();

        table.index('categoryTitle');
    });

    await knex.schema.createTable('news', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy').nullable();

        table.string('title', 100).notNullable();
        table.string('description', 250).nullable();
        table.enum('status', ['DRAFT', 'PUBLISHED']).defaultTo('DRAFT').notNullable();
        table.string('thumbnail').notNullable();
        table.string('mainImage').notNullable();
        table.uuid('categoryId').nullable().references('id').inTable('newsCategory').onDelete('SET NULL');
        table.timestamp('publishedAt').nullable();
        table.enum('targetAudience', ['ALL', 'TEACHER', 'STUDENT']).defaultTo('ALL').notNullable();

        table.index('title');
        table.index('status');
        table.index('categoryId');
        table.index('publishedAt');
        table.index('targetAudience');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('news');
    await knex.schema.dropTableIfExists('newsCategory');
}
