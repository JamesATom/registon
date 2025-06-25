// university.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { University, Faculty, Program, CertificateRequirement } from '../interface/university-search.interface';

@Injectable()
export class UniversityRepository extends BaseRepository<University, any> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.UNIVERSITY);
    }

    // University methods
    async createUniversity(data: Partial<University>): Promise<University> {
        const [university] = await super.create(data);
        return university;
    }

    async getAllUniversities(): Promise<University[]> {
        return super.getAll();
    }

    async getUniversityById(id: string): Promise<University | null> {
        return super.getOne(id);
    }

    async updateUniversity(id: string, data: Partial<University>): Promise<University> {
        const [updated] = await super.update(id, data);
        return updated;
    }

    async deleteUniversity(id: string): Promise<void> {
        await super.delete(id);
    }

    async getUniversityWithDetails(id: string): Promise<any> {
        const university = await this.knex(this.tableName)
            .select(
                `${this.tableName}.*`,
                `${TableNames.CITY}.name as cityName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.CITY, `${this.tableName}.city`, `${TableNames.CITY}.id`)
            .leftJoin(TableNames.CERTIFICATE_REQUIREMENT, `${this.tableName}.certificateRequirementId`, `${TableNames.CERTIFICATE_REQUIREMENT}.id`)
            .where(`${this.tableName}.id`, id)
            .first();

        if (!university) return null;

        const faculties = await this.knex(TableNames.FACULTY)
            .select('*')
            .where('universityId', id);

        const programs = await this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(TableNames.CERTIFICATE_REQUIREMENT, `${TableNames.PROGRAM}.certificateRequirementId`, `${TableNames.CERTIFICATE_REQUIREMENT}.id`)
            .where(`${TableNames.PROGRAM}.universityId`, id);

        return {
            ...university,
            faculties,
            programs
        };
    }

    // Faculty methods
    async createFaculty(data: Partial<Faculty>): Promise<Faculty> {
        const [faculty] = await this.knex(TableNames.FACULTY).insert(data).returning('*');
        return faculty;
    }

    async getAllFaculties(): Promise<Faculty[]> {
        return this.knex(TableNames.FACULTY).select('*');
    }

    async getFacultiesByUniversityId(universityId: string): Promise<Faculty[]> {
        return this.knex(TableNames.FACULTY)
            .select('*')
            .where('universityId', universityId);
    }

    async getFacultyById(id: string): Promise<Faculty | null> {
        return this.knex(TableNames.FACULTY)
            .select('*')
            .where('id', id)
            .first();
    }

    async updateFaculty(id: string, data: Partial<Faculty>): Promise<Faculty> {
        const [updated] = await this.knex(TableNames.FACULTY)
            .where('id', id)
            .update(data)
            .returning('*');
        return updated;
    }

    async deleteFaculty(id: string): Promise<void> {
        await this.knex(TableNames.FACULTY)
            .where('id', id)
            .delete();
    }

    // Program methods
    async createProgram(data: Partial<Program>): Promise<Program> {
        const [program] = await this.knex(TableNames.PROGRAM).insert(data).returning('*');
        return program;
    }

    async getAllPrograms(): Promise<Program[]> {
        return this.knex(TableNames.PROGRAM).select('*');
    }

    async getProgramsByUniversityId(universityId: string): Promise<Program[]> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(TableNames.CERTIFICATE_REQUIREMENT, `${TableNames.PROGRAM}.certificateRequirementId`, `${TableNames.CERTIFICATE_REQUIREMENT}.id`)
            .where(`${TableNames.PROGRAM}.universityId`, universityId);
    }

    async getProgramsByFacultyId(facultyId: string): Promise<Program[]> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(TableNames.CERTIFICATE_REQUIREMENT, `${TableNames.PROGRAM}.certificateRequirementId`, `${TableNames.CERTIFICATE_REQUIREMENT}.id`)
            .where(`${TableNames.PROGRAM}.facultyId`, facultyId);
    }

    async getProgramById(id: string): Promise<Program | null> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(TableNames.CERTIFICATE_REQUIREMENT, `${TableNames.PROGRAM}.certificateRequirementId`, `${TableNames.CERTIFICATE_REQUIREMENT}.id`)
            .where(`${TableNames.PROGRAM}.id`, id)
            .first();
    }

    async updateProgram(id: string, data: Partial<Program>): Promise<Program> {
        const [updated] = await this.knex(TableNames.PROGRAM)
            .where('id', id)
            .update(data)
            .returning('*');
        return updated;
    }

    async deleteProgram(id: string): Promise<void> {
        await this.knex(TableNames.PROGRAM)
            .where('id', id)
            .delete();
    }

    // Certificate Requirement methods
    async createCertificateRequirement(data: Partial<CertificateRequirement>): Promise<CertificateRequirement> {
        const [cert] = await this.knex(TableNames.CERTIFICATE_REQUIREMENT).insert(data).returning('*');
        return cert;
    }

    async getAllCertificateRequirements(): Promise<CertificateRequirement[]> {
        return this.knex(TableNames.CERTIFICATE_REQUIREMENT).select('*');
    }

    async getCertificateRequirementById(id: string): Promise<CertificateRequirement | null> {
        return this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .select('*')
            .where('id', id)
            .first();
    }

    async updateCertificateRequirement(id: string, data: Partial<CertificateRequirement>): Promise<CertificateRequirement> {
        const [updated] = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .where('id', id)
            .update(data)
            .returning('*');
        return updated;
    }

    async deleteCertificateRequirement(id: string): Promise<void> {
        await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .where('id', id)
            .delete();
    }
}
