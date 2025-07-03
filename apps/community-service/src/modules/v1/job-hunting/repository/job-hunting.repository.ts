// job-hunting.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { JobHunting, Company } from '../interface/job-hunting.interface';

@Injectable()
export class JobHuntingRepository extends BaseRepository<JobHunting, CreateJobHuntingDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.JOB_HUNTING);
    }

    async createJobHunting(dto: any): Promise<any> {
        return super.create(dto);
    }

    async createCompany(companyData: Partial<Company>): Promise<Company> {
        const created = await this.knex(TableNames.COMPANY).insert(companyData).returning('*');
        return created[0];
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<{ data: JobHunting[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        return super.getAll(paginationParams);
    }

    async getOne(id: string): Promise<JobHunting | null> {
        return super.getOne(id);
    }

    async updateJobHunting(id: string, dto: Partial<JobHunting>): Promise<JobHunting> {
        const updated = await super.update(id, dto);
        return updated[0];
    }

    async updateCompany(id: string, dto: Partial<Company>): Promise<Company> {
        const updated = await this.knex(TableNames.COMPANY).where('id', id).update(dto).returning('*');
        return updated[0];
    }

    async delete(id: string): Promise<void> {
        await super.delete(id);
    }

    async getJobWithCompany(id: string): Promise<any> {
        const result = await this.knex(this.tableName)
            .select(
                `${this.tableName}.*`,
                `${TableNames.COMPANY}.companyTitle`,
                `${TableNames.COMPANY}.companyLogo`,
                `${TableNames.COMPANY}.description as companyDescription`,
            )
            .leftJoin(TableNames.COMPANY, `${this.tableName}.companyId`, `${TableNames.COMPANY}.id`)
            .where(`${this.tableName}.id`, id)
            .first();

        return result;
    }

    async getAllWithCompanyDetails(paginationParams?: { page?: number; limit?: number }): Promise<{ data: any[]; pagination: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const query = this.knex(this.tableName)
            .select(`${this.tableName}.*`, `${TableNames.COMPANY}.companyTitle`, `${TableNames.COMPANY}.companyLogo`)
            .leftJoin(TableNames.COMPANY, `${this.tableName}.companyId`, `${TableNames.COMPANY}.id`);

        const [totalItems] = await query.clone().count('* as count');
        const data = await query
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

    async getAllCompanies(paginationParams?: { page?: number; limit?: number }): Promise<{ data: Company[]; meta: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.COMPANY).count('* as count');
        const data = await this.knex(TableNames.COMPANY)
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

    async getCompany(id: string): Promise<Company> {
        const company = await this.knex(TableNames.COMPANY).where('id', id).first();

        if (!company) {
            throw new RpcException({
                message: `Company with ID ${id} not found`,
                statusCode: 404,
            });
        }

        return company;
    }

    async getCompanyWithJobs(id: string): Promise<any> {
        const company = await this.knex(TableNames.COMPANY).where(`${TableNames.COMPANY}.id`, id).first();

        if (!company) {
            throw new RpcException({
                message: `Company with ID ${id} not found`,
                statusCode: 404,
            });
        }

        const jobs = await this.knex(this.tableName).where('companyId', id).select('*');

        return { ...company, jobs };
    }
}
