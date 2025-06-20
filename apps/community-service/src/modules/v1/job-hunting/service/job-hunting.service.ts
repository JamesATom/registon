// job-hunting.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { JobHuntingRepository } from '../repository/job-hunting.repository';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { Company } from '../interface/job-hunting.interface';

@Injectable()
export class JobHuntingService {
    constructor(private readonly jobHuntingRepository: JobHuntingRepository) {}

    async create(createJobHuntingDto: CreateJobHuntingDto): Promise<any> {
        const companyData = this.prepareCompanyData(createJobHuntingDto);
        const createdCompany = await this.jobHuntingRepository.createCompany(companyData);
        
        const jobData = this.prepareJobHuntingData({
            ...createJobHuntingDto,
            companyId: createdCompany.id
        });
        
        const createdJob = await this.jobHuntingRepository.createJobHunting(jobData);
        
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Job listing created successfully',
            data: {
                ...createdJob,
                company: createdCompany
            }
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Job listings retrieved successfully',
            data: await this.jobHuntingRepository.getAllWithCompanyDetails(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} retrieved successfully`,
            data: await this.jobHuntingRepository.getJobWithCompany(id),
        };
    }

    async update(id: string, updateJobHuntingDto: UpdateJobHuntingDto): Promise<any> {
        const job = await this.jobHuntingRepository.getOne(id);
        if (!job) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Job listing with ID ${id} not found`,
                data: null,
            };
        }
        
        if (this.hasCompanyData(updateJobHuntingDto)) {
            const companyData = this.prepareCompanyData(updateJobHuntingDto);
            await this.jobHuntingRepository.updateCompany(job.companyId, companyData);
        }

        const jobData = this.prepareJobHuntingData(updateJobHuntingDto);
        const updatedJob = await this.jobHuntingRepository.updateJobHunting(id, jobData);
        
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} updated successfully`,
            data: updatedJob,
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} deleted successfully`,
            data: await this.jobHuntingRepository.delete(id),
        };
    }
    
    private prepareCompanyData(dto: any): Partial<Company> {
        return {
            companyTitle: dto.companyTitle || 'Unnamed Company',
            companyLogo: dto.companyLogo,
            description: dto.companyDescription,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
        };
    }
    
    private prepareJobHuntingData(dto: any): any {
        const { company, companyTitle, companyLogo, companyDescription, ...jobData } = dto;
        return jobData;
    }
    
    private hasCompanyData(dto: any): boolean {
        return !!(dto.companyTitle || dto.companyLogo || dto.companyDescription);
    }
}
