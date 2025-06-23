import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateUniversitySearchDto } from '../dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from '../dto/update-university-search.dto';
import { FilterUniversitySearchDto } from '../dto/filter-university-search.dto';
import { University } from '../interface/university-search.interface';

@Injectable()
export class UniversitySearchRepository extends BaseRepository<University, CreateUniversitySearchDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.UNIVERSITY);
    }

    async create(createUniversitySearchDto: CreateUniversitySearchDto): Promise<any> {
        const { studyLanguages, studyTypes, ...universityData } = createUniversitySearchDto;
        console.log('Creating university with data:', createUniversitySearchDto);

        const [created] = await this.knex(TableNames.UNIVERSITY).insert(universityData).returning('*');

        return created;
    }

    async getAll(): Promise<any> {
        const universities = await this.knex(TableNames.UNIVERSITY).select('*');

        for (const university of universities) {
            university.city = await this.knex(TableNames.CITY).where('id', university.cityId).first();

            university.certificateRequirement = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
                .where('id', university.certificateRequirementId)
                .first();

            university.programs = await this.knex(TableNames.PROGRAM).where('universityId', university.id).select('*');

            university.faculties = await this.knex(TableNames.FACULTY).where('universityId', university.id).select('*');
        }

        return universities;
    }

    async getOne(id: string): Promise<any> {
        const university = await this.knex(TableNames.UNIVERSITY).where('id', id).first();

        if (!university) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        university.city = await this.knex(TableNames.CITY).where('id', university.cityId).first();

        university.certificateRequirement = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .where('id', university.certificateRequirementId)
            .first();

        university.programs = await this.knex(TableNames.PROGRAM).where('universityId', university.id).select('*');

        university.faculties = await this.knex(TableNames.FACULTY).where('universityId', university.id).select('*');

        return university;
    }

    async update(id: string, updateUniversitySearchDto: UpdateUniversitySearchDto): Promise<any> {
        const { studyLanguages, studyTypes, ...updateData } = updateUniversitySearchDto;

        const existingUniversity = await this.knex(TableNames.UNIVERSITY).where('id', id).first();

        if (!existingUniversity) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        const [updated] = await this.knex(TableNames.UNIVERSITY).where('id', id).update(updateData).returning('*');

        // Include related data
        updated.city = await this.knex(TableNames.CITY).where('id', updated.cityId).first();

        updated.certificateRequirement = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
            .where('id', updated.certificateRequirementId)
            .first();

        updated.programs = await this.knex(TableNames.PROGRAM).where('universityId', updated.id).select('*');

        updated.faculties = await this.knex(TableNames.FACULTY).where('universityId', updated.id).select('*');

        return updated;
    }

    async delete(id: string): Promise<any> {
        const existingUniversity = await this.knex(TableNames.UNIVERSITY).where('id', id).first();

        if (!existingUniversity) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        // Delete related records
        await this.knex(TableNames.PROGRAM).where('universityId', id).delete();

        await this.knex(TableNames.FACULTY).where('universityId', id).delete();

        const [deleted] = await this.knex(TableNames.UNIVERSITY).where('id', id).delete().returning('*');

        return deleted;
    }

    async filter(filterDto: FilterUniversitySearchDto): Promise<any> {
        const { searchTerm, type, cityId, certificateRequirementId } = filterDto;

        // Build query
        let query = this.knex(TableNames.UNIVERSITY);

        if (searchTerm) {
            query = query.where(builder => {
                builder.where('title', 'ilike', `%${searchTerm}%`).orWhere('description', 'ilike', `%${searchTerm}%`);
            });
        }

        if (type) {
            query = query.where('type', type);
        }

        if (cityId) {
            query = query.where('cityId', cityId);
        }

        if (certificateRequirementId) {
            query = query.where('certificateRequirementId', certificateRequirementId);
        }

        const universities = await query.select('*');

        // Add related data
        for (const university of universities) {
            university.city = await this.knex(TableNames.CITY).where('id', university.cityId).first();

            university.certificateRequirement = await this.knex(TableNames.CERTIFICATE_REQUIREMENT)
                .where('id', university.certificateRequirementId)
                .first();

            university.programs = await this.knex(TableNames.PROGRAM).where('universityId', university.id).select('*');

            university.faculties = await this.knex(TableNames.FACULTY).where('universityId', university.id).select('*');
        }

        return universities;
    }
}
