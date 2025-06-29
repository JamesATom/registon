// certificate-requirement.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { UniversityRepository } from '../repository/university.repository';
import { CreateCertificateRequirementDto } from '../dto/create-certificate-requirement.dto';
import { UpdateCertificateRequirementDto } from '../dto/update-certificate-requirement.dto';

@Injectable()
export class CertificateRequirementService {
    constructor(private readonly universityRepository: UniversityRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    async create(createCertificateRequirementDto: CreateCertificateRequirementDto): Promise<any> {
        const certificateRequirement = await this.universityRepository.createCertificateRequirement(
            createCertificateRequirementDto,
        );
        return this.formatResponse(
            HttpStatus.CREATED,
            'Certificate Requirement created successfully',
            certificateRequirement,
        );
    }

    async getAll(): Promise<any> {
        const certificateRequirements = await this.universityRepository.getAllCertificateRequirements();
        return this.formatResponse(
            HttpStatus.OK,
            'Certificate Requirements retrieved successfully',
            certificateRequirements,
        );
    }

    async getOne(id: string): Promise<any> {
        const certificateRequirement = await this.universityRepository.getCertificateRequirementById(id);
        if (!certificateRequirement) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Certificate Requirement with ID ${id} not found`, null);
        }
        return this.formatResponse(
            HttpStatus.OK,
            `Certificate Requirement with ID ${id} retrieved successfully`,
            certificateRequirement,
        );
    }

    async update(id: string, updateCertificateRequirementDto: UpdateCertificateRequirementDto): Promise<any> {
        const existingCertificateRequirement = await this.universityRepository.getCertificateRequirementById(id);
        if (!existingCertificateRequirement) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Certificate Requirement with ID ${id} not found`, null);
        }

        const updatedCertificateRequirement = await this.universityRepository.updateCertificateRequirement(
            id,
            updateCertificateRequirementDto,
        );
        return this.formatResponse(
            HttpStatus.OK,
            `Certificate Requirement with ID ${id} updated successfully`,
            updatedCertificateRequirement,
        );
    }

    async delete(id: string): Promise<any> {
        const existingCertificateRequirement = await this.universityRepository.getCertificateRequirementById(id);
        if (!existingCertificateRequirement) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Certificate Requirement with ID ${id} not found`, null);
        }

        await this.universityRepository.deleteCertificateRequirement(id);
        return this.formatResponse(HttpStatus.OK, `Certificate Requirement with ID ${id} deleted successfully`, null);
    }
}
