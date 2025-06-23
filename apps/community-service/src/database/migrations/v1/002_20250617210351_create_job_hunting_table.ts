// 20250617210351_create_job_hunting_table.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // const enumTypes = await knex.raw(`
    //     SELECT typname
    //     FROM pg_type
    //     WHERE typname IN ('WorkExperience', 'WorkScheduleHours', 'EmploymentType', 'WorkMode')
    // `);

    // if (enumTypes.rows.length < 4) {
    //     throw new Error('Required enum types are not created yet. Please run the enum types migration first.');
    // }

    await knex.schema.createTable('company', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('companyLogo').nullable();
        table.string('companyTitle').notNullable();
        table.text('description').nullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy');

        table.index('companyTitle');
    });

    await knex.schema.createTable('jobHunting', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('title').notNullable();
        table.text('description').nullable();
        table.string('certificateRequirements').nullable();
        table.specificType('workExperience', '"WorkExperience"').notNullable();
        table.specificType('workScheduleHours', '"WorkScheduleHours"').nullable();
        table.specificType('employmentType', '"EmploymentType"').nullable();
        table.specificType('workMode', '"WorkMode"').nullable();
        table.integer('salary').nullable();
        table.string('responsibilities', 500).nullable();
        table.string('requirements', 500).nullable();
        table.string('conditions', 500).nullable();

        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.string('updatedBy').nullable();

        table.uuid('companyId').nullable().references('id').inTable('company').onDelete('SET NULL');
        table.uuid('cityId').nullable().references('id').inTable('city').onDelete('SET NULL');

        table.index(['companyId']);
        table.index(['cityId']);
        table.index(['title']);
        table.index(['workExperience']);
    });

    // await knex.schema.createTable('cv', table => {
    //     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.string('companyName').notNullable();
    //     table.string('studentId').notNullable();
    //     table.text('description').nullable();
    //     table.specificType('degree', 'Degree');
    //     table.string('universityTitle', 50);
    //     table.string('universityMajor');
    //     table.integer('graduationYear');
    //     table.string('position', 50);
    //     table.string('responsibilities', 50);
    //     table.timestamp('startDate');
    //     table.timestamp('endDate');

    //     table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    //     table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();

    //     table.uuid('cityId').notNullable().references('id').inTable('city');

    //     table.index('studentId');
    //     table.index('cityId');
    //     table.index('universityTitle');
    // });

    // await knex.schema.createTable('skill', table => {
    //     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.string('name').notNullable().unique();
    // });

    // await knex.schema.createTable('tool', table => {
    //     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    //     table.string('name').notNullable().unique();
    // });

    // await knex.schema.createTable('cvSkill', table => {
    //     table.primary(['cvId', 'skillId']);

    //     table.uuid('cvId').notNullable().references('id').inTable('cv').onDelete('CASCADE');
    //     table.uuid('skillId').notNullable().references('id').inTable('skill').onDelete('CASCADE');

    //     table.index('cvId');
    //     table.index('skillId');
    // });

    // await knex.schema.createTable('cvTool', table => {
    //     table.uuid('cvId').notNullable().references('id').inTable('cv').onDelete('CASCADE');
    //     table.uuid('toolId').notNullable().references('id').inTable('tool').onDelete('CASCADE');

    //     table.primary(['cvId', 'toolId']);

    //     table.index('cvId');
    //     table.index('toolId');
    // });
}

export async function down(knex: Knex): Promise<void> {
    // await knex.schema.dropTableIfExists('cvTool');
    // await knex.schema.dropTableIfExists('cvSkill');
    // await knex.schema.dropTableIfExists('tool');
    // await knex.schema.dropTableIfExists('skill');
    // await knex.schema.dropTableIfExists('cv');
    await knex.schema.dropTableIfExists('jobHunting');
    await knex.schema.dropTableIfExists('company');
}
