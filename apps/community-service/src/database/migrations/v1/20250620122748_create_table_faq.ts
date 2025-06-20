// 20250620122748_create_table_faq.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // Create FAQ Category Table
    await knex.schema.createTable('faqCategory', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        
        // Timestamps and audit fields
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');
        
        // Main data fields
        table.string('title', 50).notNullable();
        table.string('description', 250);
        
        // Indexes
        table.index('title');
    });

    // Create FAQ Table
    await knex.schema.createTable('faq', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        
        // Timestamps and audit fields
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');
        
        // Main data fields
        table.string('question', 500).notNullable();
        table.string('answer', 500).notNullable();
        
        // Foreign key relationship
        table.uuid('categoryId').references('id').inTable('faqCategory').onDelete('CASCADE');
        
        // Indexes
        table.index('categoryId');
    });
}

export async function down(knex: Knex): Promise<void> {
    // Drop tables in reverse order to avoid foreign key constraint errors
    await knex.schema.dropTableIfExists('faq');
    await knex.schema.dropTableIfExists('faqCategory');
}