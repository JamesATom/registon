// company.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { JobHuntingRepository } from '../repository/job-hunting.repository';
import { Company } from '../interface/job-hunting.interface';

@Injectable()
export class CompanyService {
    constructor(private readonly jobHuntingRepository: JobHuntingRepository) {}

    async createCompany(companyData: any): Promise<any> {
        const company = await this.jobHuntingRepository.createCompany(companyData);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Company created successfully',
            data: company,
        };
    }

    async getAllCompanies(): Promise<any> {
        const companies = await this.jobHuntingRepository.getAllCompanies();
        return {
            statusCode: HttpStatus.OK,
            message: 'Companies retrieved successfully',
            data: companies,
        };
    }

    async getCompany(id: string): Promise<any> {
        const company = await this.jobHuntingRepository.getCompany(id);
        if (!company) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Company with ID ${id} not found`,
                data: null,
            };
        }
        return {
            statusCode: HttpStatus.OK,
            message: `Company with ID ${id} retrieved successfully`,
            data: company,
        };
    }

    async updateCompany(id: string, updateData: any): Promise<any> {
        const company = await this.jobHuntingRepository.getCompany(id);
        if (!company) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Company with ID ${id} not found`,
                data: null,
            };
        }

        const updatedCompany = await this.jobHuntingRepository.updateCompany(id, updateData);
        return {
            statusCode: HttpStatus.OK,
            message: `Company with ID ${id} updated successfully`,
            data: updatedCompany,
        };
    }

    async getCompanyWithJobs(id: string): Promise<any> {
        const companyWithJobs = await this.jobHuntingRepository.getCompanyWithJobs(id);
        return {
            statusCode: HttpStatus.OK,
            message: `Company with jobs retrieved successfully`,
            data: companyWithJobs,
        };
    }

    prepareCompanyData(dto: any): Partial<Company> {
        return {
            companyTitle: dto.companyTitle || 'Unnamed Company',
            companyLogo: dto.companyLogo,
            description: dto.description || dto.companyDescription, // Handle both field names
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
        };
    }
}
