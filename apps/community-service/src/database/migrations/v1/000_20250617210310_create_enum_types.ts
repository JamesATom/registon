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
			'1-3',
			'3-6',
			'6+',
			'NO EXPERIENCE'
		)
  `);

    // Work Schedule Hours enum
    await knex.raw(`
		CREATE TYPE "WorkScheduleHours" AS ENUM (
      '6/1',
      '5/2',
      'WEEKENDS',
      'FREE',
      'OTHER'
		)
  `);

    // Employment Type enum
    await knex.raw(`
		CREATE TYPE "EmploymentType" AS ENUM (
			'FULL',
      'PART'
		)
  `);

    // Work Mode enum
    await knex.raw(`
		CREATE TYPE "WorkMode" AS ENUM (
			'OFFLINE',
      'ONLINE',
      'HYBRID'
		)
  `);

    // Degree enum
    await knex.raw(`
		CREATE TYPE "Degree" AS ENUM (
      'BACHELOR',
      'MASTER', 
      'DOCTORATE',
      'ASSOCIATE',
      'PHD'
		)
  `);

    // University Type enum
    await knex.raw(`
		CREATE TYPE "UniType" AS ENUM (
      'LOCAL',
      'INTERNATIONAL',
      'FOREIGN'
		)
  `);

    // Study Language enum
    await knex.raw(`
		CREATE TYPE "StudyLanguage" AS ENUM (
      'UZBEK',
			'RUSSIAN',
			'ENGLISH'
		)
  `);

    // Study Type enum
    await knex.raw(`
		CREATE TYPE "StudyType" AS ENUM (
			'FULL_TIME',
			'PART_TIME',
			'REMOTE',
			'HYBRID'
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
