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

    async createJobHunting(dto: CreateJobHuntingDto): Promise<any> {
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
        try {
            await super.delete(id);
        } catch (error) {
            throw new RpcException(error.message || 'Error deleting job hunting entry');
        }
    }

    async filter(filterDto: Partial<JobHunting>): Promise<JobHunting[]> {
        try {
            const query = this.knex(this.tableName).select('*');
            
            if (filterDto.title) {
                query.where('title', 'ilike', `%${filterDto.title}%`);
            }
            
            if (filterDto.workExperience) {
                query.where('workExperience', filterDto.workExperience);
            }
            
            if (filterDto.workMode) {
                query.where('workMode', filterDto.workMode);
            }
            
            if (filterDto.employmentType) {
                query.where('employmentType', filterDto.employmentType);
            }
            
            if (filterDto.cityId) {
                query.where('cityId', filterDto.cityId);
            }
            
            if (filterDto.companyId) {
                query.where('companyId', filterDto.companyId);
            }
            
            return await query;
        } catch (error) {
            throw new RpcException(error.message || 'Error filtering job hunting entries');
        }
    }
    
    async getJobWithCompany(id: string): Promise<any> {
        try {
            const result = await this.knex(this.tableName)
                .select(
                    `${this.tableName}.*`,
                    `${TableNames.COMPANY}.companyTitle`,
                    `${TableNames.COMPANY}.companyLogo`,
                    `${TableNames.COMPANY}.description as companyDescription`
                )
                .leftJoin(
                    TableNames.COMPANY,
                    `${this.tableName}.companyId`,
                    `${TableNames.COMPANY}.id`
                )
                .where(`${this.tableName}.id`, id)
                .first();
                
            return result;
        } catch (error) {
            throw new RpcException(error.message || 'Error fetching job with company details');
        }
    }
    
    async getAllWithCompanyDetails(): Promise<any[]> {
        try {
            const results = await this.knex(this.tableName)
                .select(
                    `${this.tableName}.*`,
                    `${TableNames.COMPANY}.companyTitle`,
                    `${TableNames.COMPANY}.companyLogo`
                )
                .leftJoin(
                    TableNames.COMPANY,
                    `${this.tableName}.companyId`,
                    `${TableNames.COMPANY}.id`
                );
                
            return results;
        } catch (error) {
            throw new RpcException(error.message || 'Error fetching jobs with company details');
        }
    }
}
