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

    async getAll(): Promise<JobHunting[]> {
        return super.getAll();
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

    async getAllWithCompanyDetails(): Promise<any[]> {
        const results = await this.knex(this.tableName)
            .select(`${this.tableName}.*`, `${TableNames.COMPANY}.companyTitle`, `${TableNames.COMPANY}.companyLogo`)
            .leftJoin(TableNames.COMPANY, `${this.tableName}.companyId`, `${TableNames.COMPANY}.id`);

        return results;
    }

    async getAllCompanies(): Promise<Company[]> {
        const companies = await this.knex(TableNames.COMPANY).select('*');
        return companies;
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
