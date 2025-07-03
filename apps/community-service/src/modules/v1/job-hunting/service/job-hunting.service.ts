// job-hunting.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { JobHuntingRepository } from '../repository/job-hunting.repository';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';

@Injectable()
export class JobHuntingService {
    constructor(private readonly jobHuntingRepository: JobHuntingRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    private async validateCompany(companyId: string) {
        const existingCompany = await this.jobHuntingRepository.getCompany(companyId);
        if (!existingCompany) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Company with ID ${companyId} does not exist`, null);
        }
        return null;
    }

    async create(createJobHuntingDto: CreateJobHuntingDto): Promise<any> {
        const { company, ...jobData } = createJobHuntingDto;

        const companyValidationError = await this.validateCompany(company);
        if (companyValidationError) return companyValidationError;

        const [createdJob] = await this.jobHuntingRepository.createJobHunting({
            ...jobData,
            companyId: company,
        });

        return this.formatResponse(HttpStatus.CREATED, 'Job listing created successfully', createdJob);
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const data = await this.jobHuntingRepository.getAllWithCompanyDetails(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'Job listings retrieved successfully', data);
    }

    async getOne(id: string): Promise<any> {
        const data = await this.jobHuntingRepository.getJobWithCompany(id);
        return this.formatResponse(HttpStatus.OK, `Job listing with ID ${id} retrieved successfully`, data);
    }

    async update(id: string, updateJobHuntingDto: UpdateJobHuntingDto): Promise<any> {
        const job = await this.jobHuntingRepository.getOne(id);
        if (!job) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Job listing with ID ${id} not found`, null);
        }

        const { company, ...jobData } = updateJobHuntingDto;

        const companyValidationError = await this.validateCompany(company);
        if (companyValidationError) return companyValidationError;

        const updatedJob = await this.jobHuntingRepository.updateJobHunting(id, {
            ...jobData,
            companyId: company,
        });

        return this.formatResponse(HttpStatus.OK, `Job listing with ID ${id} updated successfully`, updatedJob);
    }

    async delete(id: string): Promise<any> {
        const data = await this.jobHuntingRepository.delete(id);
        return this.formatResponse(HttpStatus.OK, `Job listing with ID ${id} deleted successfully`, data);
    }
}
