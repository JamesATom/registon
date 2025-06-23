// company.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Controller()
export class CompanyEvent {
    constructor(private readonly companyService: CompanyService) {}

    @MessagePattern(MessagePatterns.Company.V1.CREATE)
    async createCompany(@Payload() createCompanyDto: CreateCompanyDto): Promise<any> {
        return this.companyService.createCompany(createCompanyDto);
    }

    @MessagePattern(MessagePatterns.Company.V1.GET_ALL)
    async getAllCompanies(): Promise<any> {
        return this.companyService.getAllCompanies();
    }

    @MessagePattern(MessagePatterns.Company.V1.GET_ONE)
    async getCompany(@Payload() { id }: { id: string }): Promise<any> {
        return this.companyService.getCompany(id);
    }

    @MessagePattern(MessagePatterns.Company.V1.UPDATE)
    async updateCompany(
        @Payload() { id, updateCompanyDto }: { id: string; updateCompanyDto: UpdateCompanyDto },
    ): Promise<any> {
        return this.companyService.updateCompany(id, updateCompanyDto);
    }

    @MessagePattern(MessagePatterns.Company.V1.GET_WITH_JOBS)
    async getCompanyWithJobs(@Payload() { id }: { id: string }): Promise<any> {
        return this.companyService.getCompanyWithJobs(id);
    }
}
