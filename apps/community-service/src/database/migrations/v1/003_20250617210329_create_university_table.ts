// 20250617210329_create_university_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // await knex.schema.createTable('certificateRequirement', table => {
    //     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.timestamp('createdAt').defaultTo(knex.fn.now());
    //     table.string('createdBy').nullable();
    //     table.timestamp('updatedAt').defaultTo(knex.fn.now());
    //     table.string('updatedBy').nullable();
    //     table.string('certificateRequirementTitle', 50).notNullable();
    //     table.string('description', 250).nullable();

    //     table.index('certificateRequirementTitle');
    // });

    await knex.schema.createTable('university', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('title', 100).notNullable();
        table.string('description', 500).nullable();
        table.timestamp('registrationDate').notNullable();
        table.specificType('type', '"UniType"').nullable();
        table.boolean('status').nullable();
        table.string('contract', 100).notNullable();
        table.integer('contacts').nullable();
        table.string('website', 50).nullable();
        table.string('email', 50).nullable();
        table.string('address', 100).nullable();
        table.string('logo').nullable();
        table.string('license').nullable();
        table.text('certificateRequirements').nullable();

        table.uuid('city').nullable().references('id').inTable('city');
        // table.uuid('certificateRequirementId').nullable().references('id').inTable('certificateRequirement');

        table.index('city');
        // table.index('certificateRequirementId');
        table.index('title');
    });

    await knex.schema.createTable('faculty', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('facultyTitle', 50).notNullable();
        table.string('description', 250).nullable();

        table.uuid('universityId').notNullable().references('id').inTable('university').onDelete('CASCADE');

        table.index('universityId');
        table.index('facultyTitle');
    });

    await knex.schema.createTable('program', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('title', 100).notNullable();
        table.specificType('studyLanguage', '"StudyLanguage"').notNullable();
        table.integer('contract').notNullable();
        table.specificType('degree', '"Degree"').notNullable();
        table.specificType('studyType', '"StudyType"').nullable();

        table.uuid('facultyId').nullable().references('id').inTable('faculty').onDelete('SET NULL');
        table.uuid('universityId').notNullable().references('id').inTable('university').onDelete('CASCADE');
        // table
        //     .uuid('certificateRequirementId')
        //     .nullable()
        //     .references('id')
        //     .inTable('certificateRequirement')
        //     .onDelete('SET NULL');

        table.index('facultyId');
        table.index('universityId');
        // table.index('certificateRequirementId');
        table.index('title');
        table.index('studyLanguage');
        table.index('degree');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('program');
    await knex.schema.dropTableIfExists('faculty');
    await knex.schema.dropTableIfExists('university');
    // await knex.schema.dropTableIfExists('certificateRequirement');
}
