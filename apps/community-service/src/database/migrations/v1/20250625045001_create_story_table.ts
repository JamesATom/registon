// 20250625045001_create_table_story.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE OR REPLACE FUNCTION set_story_item_order_number()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW."orderNumber" := COALESCE(
                (SELECT MAX("orderNumber") + 1 FROM "storyItem" WHERE "storyId" = NEW."storyId"),
                1
            );
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    await knex.schema.createTable('story', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

        table.string('thumbnail').notNullable();
        table.string('link', 250).nullable();
        table.string('branch').notNullable();

        table.string('commentAdmin', 250).nullable();
        table.string('title', 100).notNullable();
        table.enum('status', ['DRAFT', 'PUBLISHED']).defaultTo('DRAFT').notNullable();
        table.timestamp('publishedAt').nullable(); // until this date time, story is visible from createdAt
        table.string('buttonText', 20).nullable();

        table.string('createdBy').notNullable();
        table.string('updatedBy').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();

        table.index('status');
        table.index('createdAt');
        table.index('publishedAt');
    });

    await knex.schema.createTable('storyItem', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('storyId').notNullable();
        table.string('title', 100).nullable();
        table.string('description', 250).nullable();
        table.string('image').notNullable();
        table.integer('orderNumber').notNullable();

        table.foreign('storyId').references('id').inTable('story').onDelete('CASCADE');

        table.index('storyId');
        table.index('orderNumber');
    });

    await knex.raw(`
        CREATE TRIGGER set_story_item_order_number_trigger
        BEFORE INSERT ON "storyItem"
        FOR EACH ROW
        EXECUTE FUNCTION set_story_item_order_number();
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`DROP TRIGGER IF EXISTS set_story_item_order_number_trigger ON "storyItem"`);

    await knex.schema.dropTableIfExists('storyItem');
    await knex.schema.dropTableIfExists('story');

    await knex.raw(`DROP FUNCTION IF EXISTS set_story_item_order_number()`);
}
