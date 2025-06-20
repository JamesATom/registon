import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('programs', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('createdBy').nullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.string('updatedBy').nullable();
        table.string('title', 100).notNullable();
        table.specificType('studyLanguage', 'StudyLanguage').notNullable();
        table.integer('contract').notNullable();
        table.specificType('degree', 'Degree').notNullable();
        table.specificType('studyType', 'StudyType').nullable();

        // Foreign keys
        table.uuid('facultyId').nullable().references('id').inTable('faculties').onDelete('SET NULL');
        table.uuid('universityId').notNullable().references('id').inTable('universities').onDelete('CASCADE');
        table
            .uuid('certificateRequirementId')
            .nullable()
            .references('id')
            .inTable('certificateRequirements')
            .onDelete('SET NULL');

        // Indexes
        table.index('facultyId');
        table.index('universityId');
        table.index('certificateRequirementId');
        table.index('title');
        table.index('studyLanguage');
        table.index('degree');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('programs');
}
