// 20250617210310_create_enum_types.ts
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	// Create enum for course levels
    await knex.raw(`
        CREATE TYPE "CourseLevel" AS ENUM (
            'BEGINNER',
            'ELEMENTARY',
            'PRE_INTERMEDIATE',
            'INTERMEDIATE',
            'UPPER_INTERMEDIATE',
            'ADVANCED',
            'PROFICIENCY'
        );
    `);
	
    // Work Experience enum
    await knex.raw(`
		CREATE TYPE "WorkExperience" AS ENUM (
			'Experience13',
			'Experience36',
			'Experience6Plus',
			'NoExperience'
		)
  `);

    // Work Schedule Hours enum
    await knex.raw(`
		CREATE TYPE "WorkScheduleHours" AS ENUM (
			'Schedule61',
			'Schedule52',
			'Weekends',
			'Free',
			'Other'
		)
  `);

    // Employment Type enum
    await knex.raw(`
		CREATE TYPE "EmploymentType" AS ENUM (
			'Full',
			'Part'
		)
  `);

    // Work Mode enum
    await knex.raw(`
		CREATE TYPE "WorkMode" AS ENUM (
			'Offline',
			'Online',
			'Hybrid'
		)
  `);

    // Degree enum
    await knex.raw(`
		CREATE TYPE "Degree" AS ENUM (
			'Bachelor',
			'Master',
			'Doctorate',
			'Associate',
			'Phd'
		)
  `);

    // University Type enum
    await knex.raw(`
		CREATE TYPE "UniType" AS ENUM (
			'Local',
			'International',
			'Foreign'
		)
  `);

    // Study Language enum
    await knex.raw(`
		CREATE TYPE "StudyLanguage" AS ENUM (
			'Uzbek',
			'Russian',
			'English'
		)
  `);

    // Study Type enum
    await knex.raw(`
		CREATE TYPE "StudyType" AS ENUM (
			'FullTime',
			'PartTime',
			'Remote',
			'Hybrid'
		)
  `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TYPE IF EXISTS "StudyType"');
    await knex.raw('DROP TYPE IF EXISTS "StudyLanguage"');
    await knex.raw('DROP TYPE IF EXISTS "UniType"');
    await knex.raw('DROP TYPE IF EXISTS "Degree"');
    await knex.raw('DROP TYPE IF EXISTS "WorkMode"');
    await knex.raw('DROP TYPE IF EXISTS "EmploymentType"');
    await knex.raw('DROP TYPE IF EXISTS "WorkScheduleHours"');
    await knex.raw('DROP TYPE IF EXISTS "WorkExperience"');
	await knex.raw('DROP TYPE IF EXISTS "CourseLevel"');
}
