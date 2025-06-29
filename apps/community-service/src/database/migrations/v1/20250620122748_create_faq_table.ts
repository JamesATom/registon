// 20250620122748_create_table_faq.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('faqCategory', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');

        table.string('title', 50).notNullable();
        table.string('description', 250);

        table.index('title');
    });

    await knex.schema.createTable('faq', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');

        table.string('question', 500).notNullable();
        table.string('answer', 500).notNullable();

        table.uuid('categoryId').references('id').inTable('faqCategory').onDelete('CASCADE');

        table.index('categoryId');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('faq');
    await knex.schema.dropTableIfExists('faqCategory');
}
