// certificate-requirement.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CertificateRequirementService } from '../service/certificate-requirement.service';
import { CreateCertificateRequirementDto } from '../dto/create-certificate-requirement.dto';
import { UpdateCertificateRequirementDto } from '../dto/update-certificate-requirement.dto';

@Controller()
export class CertificateRequirementEvent {
    constructor(private readonly certificateRequirementService: CertificateRequirementService) {}

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CertificateRequirement.CREATE)
    async create(@Payload() createCertificateRequirementDto: CreateCertificateRequirementDto): Promise<any> {
        return this.certificateRequirementService.create(createCertificateRequirementDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CertificateRequirement.GET_ALL)
    async getAll(): Promise<any> {
        return this.certificateRequirementService.getAll();
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CertificateRequirement.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.certificateRequirementService.getOne(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CertificateRequirement.UPDATE)
    async update(
        @Payload() { id, updateCertificateRequirementDto }: { id: string; updateCertificateRequirementDto: UpdateCertificateRequirementDto },
    ): Promise<any> {
        return this.certificateRequirementService.update(id, updateCertificateRequirementDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CertificateRequirement.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.certificateRequirementService.delete(id);
    }
}
