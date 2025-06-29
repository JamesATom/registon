// 20250629083648_create_shop_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('shopCategory', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('title', 50).notNullable();
        table.string('description', 250);
        
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt');
        table.string('createdBy').notNullable();
        table.string('updatedBy').notNullable();

        table.index(['title'], 'idxShopCategoryTitle');
    });

    await knex.schema.createTable('shopProduct', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('title', 50).notNullable();
        table.string('description', 250);
        table.string('image');
        table.integer('points').notNullable().defaultTo(0);
        table.integer('quantity').notNullable().defaultTo(0);
        
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt');
        table.string('createdBy').notNullable();
        table.string('updatedBy').notNullable();
        
        table.uuid('shopCategoryId').references('id').inTable('shopCategory').onDelete('CASCADE');
        
        table.index(['title'], 'idxShopProductsTitle');
        table.index(['shopCategoryId'], 'idxShopProductsCategory');
    });

    // await knex.schema.createTable('shopOrder', table => {
    //     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.timestamp('createdAt').defaultTo(knex.fn.now());
    //     table.timestamp('updatedAt');
    //     table.enum('status', ['READY', 'ACCEPTED', 'SENT', 'FINISHED']).defaultTo('READY');
    //     table.integer('points').notNullable().defaultTo(0);
    //     table.string('createdBy').notNullable();
    //     table.string('updatedBy').notNullable();
        
    //     table.uuid('product').references('id').inTable('shopProduct').notNullable().onDelete('CASCADE');
    //     table.uuid('student').references('id').inTable('users').notNullable().onDelete('CASCADE');
        
    //     table.index(['product'], 'idxShopOrderProduct');
    //     table.index(['student'], 'idxShopOrderStudent');
    //     table.index(['status'], 'idxShopOrderStatus');
    // });
}

export async function down(knex: Knex): Promise<void> {
    // await knex.schema.dropTableIfExists('shopOrder');
    await knex.schema.dropTableIfExists('shopProduct');
    await knex.schema.dropTableIfExists('shopCategory');
}
