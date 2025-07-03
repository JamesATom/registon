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

    async createUniversity(data: Partial<University>): Promise<University> {
        const [university] = await super.create(data);
        return university;
    }

    async getAllUniversities(paginationParams?: { page?: number; limit?: number }): Promise<{ data: University[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        return super.getAll(paginationParams);
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

    // Faculty methods
    async createFaculty(data: Partial<Faculty>): Promise<Faculty> {
        const [faculty] = await this.knex(TableNames.FACULTY).insert(data).returning('*');
        return faculty;
    }

    async getAllFaculties(paginationParams?: { page?: number; limit?: number }): Promise<{ data: Faculty[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.FACULTY).count('* as count');
        const data = await this.knex(TableNames.FACULTY)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            pagination: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getFacultiesByUniversityId(universityId: string): Promise<Faculty[]> {
        return this.knex(TableNames.FACULTY).select('*').where('universityId', universityId);
    }

    async getFacultyById(id: string): Promise<Faculty | null> {
        return this.knex(TableNames.FACULTY).select('*').where('id', id).first();
    }

    async updateFaculty(id: string, data: Partial<Faculty>): Promise<Faculty> {
        const [updated] = await this.knex(TableNames.FACULTY).where('id', id).update(data).returning('*');
        return updated;
    }

    async deleteFaculty(id: string): Promise<void> {
        await this.knex(TableNames.FACULTY).where('id', id).delete();
    }

    // Program methods
    async createProgram(data: Partial<Program>): Promise<Program> {
        const [program] = await this.knex(TableNames.PROGRAM).insert(data).returning('*');
        return program;
    }

    async getAllPrograms(paginationParams?: { page?: number; limit?: number }): Promise<{ data: Program[]; meta: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const query = this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(
                TableNames.CERTIFICATE_REQUIREMENT,
                `${TableNames.PROGRAM}.certificateRequirementId`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.id`
            );

        const [totalItems] = await query.clone().count('* as count');
        const data = await query
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            meta: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getProgramsByUniversityId(universityId: string): Promise<Program[]> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`,
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(
                TableNames.CERTIFICATE_REQUIREMENT,
                `${TableNames.PROGRAM}.certificateRequirementId`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.id`,
            )
            .where(`${TableNames.PROGRAM}.universityId`, universityId);
    }

    async getProgramsByFacultyId(facultyId: string): Promise<Program[]> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`,
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(
                TableNames.CERTIFICATE_REQUIREMENT,
                `${TableNames.PROGRAM}.certificateRequirementId`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.id`,
            )
            .where(`${TableNames.PROGRAM}.facultyId`, facultyId);
    }

    async getProgramById(id: string): Promise<Program | null> {
        return this.knex(TableNames.PROGRAM)
            .select(
                `${TableNames.PROGRAM}.*`,
                `${TableNames.FACULTY}.facultyTitle as facultyName`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.certificateRequirementsTitle as certificateRequirement`,
            )
            .leftJoin(TableNames.FACULTY, `${TableNames.PROGRAM}.facultyId`, `${TableNames.FACULTY}.id`)
            .leftJoin(
                TableNames.CERTIFICATE_REQUIREMENT,
                `${TableNames.PROGRAM}.certificateRequirementId`,
                `${TableNames.CERTIFICATE_REQUIREMENT}.id`,
            )
            .where(`${TableNames.PROGRAM}.id`, id)
            .first();
    }

    async updateProgram(id: string, data: Partial<Program>): Promise<Program> {
        const [updated] = await this.knex(TableNames.PROGRAM).where('id', id).update(data).returning('*');
        return updated;
    }

    async deleteProgram(id: string): Promise<void> {
        await this.knex(TableNames.PROGRAM).where('id', id).delete();
    }

    // Certificate Requirement methods
    async createCertificateRequirement(data: Partial<CertificateRequirement>): Promise<CertificateRequirement> {
        const [cert] = await this.knex(TableNames.CERTIFICATE_REQUIREMENT).insert(data).returning('*');
        return cert;
    }

    async getAllCertificateRequirements(paginationParams?: { page?: number; limit?: number }): Promise<{ data: CertificateRequirement[]; meta: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.CERTIFICATE_REQUIREMENT).count('* as count');
        const data = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            meta: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getCertificateRequirementById(id: string): Promise<CertificateRequirement | null> {
        return this.knex(TableNames.CERTIFICATE_REQUIREMENT).select('*').where('id', id).first();
    }

    async updateCertificateRequirement(
        id: string,
        data: Partial<CertificateRequirement>,
    ): Promise<CertificateRequirement> {
        const [updated] = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .where('id', id)
            .update(data)
            .returning('*');
        return updated;
    }

    async deleteCertificateRequirement(id: string): Promise<void> {
        await this.knex(TableNames.CERTIFICATE_REQUIREMENT).where('id', id).delete();
    }
}
