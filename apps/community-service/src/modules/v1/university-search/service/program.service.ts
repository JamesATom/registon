// program.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { UniversityRepository } from '../repository/university.repository';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';

@Injectable()
export class ProgramService {
    constructor(private readonly universityRepository: UniversityRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    private async validateUniversity(universityId: string) {
        const existingUniversity = await this.universityRepository.getUniversityById(universityId);
        if (!existingUniversity) {
            return this.formatResponse(
                HttpStatus.BAD_REQUEST,
                `University with ID ${universityId} does not exist`,
                null,
            );
        }
        return null;
    }

    private async validateFaculty(facultyId: string) {
        if (!facultyId) return null;

        const existingFaculty = await this.universityRepository.getFacultyById(facultyId);
        if (!existingFaculty) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Faculty with ID ${facultyId} does not exist`, null);
        }
        return null;
    }

    private async validateCertificateRequirement(certId: string) {
        if (!certId) return null;

        const existingCert = await this.universityRepository.getCertificateRequirementById(certId);
        if (!existingCert) {
            return this.formatResponse(
                HttpStatus.BAD_REQUEST,
                `Certificate Requirement with ID ${certId} does not exist`,
                null,
            );
        }
        return null;
    }

    async create(createProgramDto: CreateProgramDto): Promise<any> {
        const { universityId, facultyId, certificateRequirementId } = createProgramDto;

        // Validate university exists
        const universityValidationError = await this.validateUniversity(universityId);
        if (universityValidationError) return universityValidationError;

        // Validate faculty exists if provided
        const facultyValidationError = await this.validateFaculty(facultyId);
        if (facultyValidationError) return facultyValidationError;

        // Validate certificate requirement exists if provided
        const certValidationError = await this.validateCertificateRequirement(certificateRequirementId);
        if (certValidationError) return certValidationError;

        const program = await this.universityRepository.createProgram(createProgramDto);
        return this.formatResponse(HttpStatus.CREATED, 'Program created successfully', program);
    }

    async getAll(): Promise<any> {
        const programs = await this.universityRepository.getAllPrograms();
        return this.formatResponse(HttpStatus.OK, 'Programs retrieved successfully', programs);
    }

    async getAllByUniversity(universityId: string): Promise<any> {
        // Validate university exists
        const universityValidationError = await this.validateUniversity(universityId);
        if (universityValidationError) return universityValidationError;

        const programs = await this.universityRepository.getProgramsByUniversityId(universityId);
        return this.formatResponse(
            HttpStatus.OK,
            `Programs for university ${universityId} retrieved successfully`,
            programs,
        );
    }

    async getAllByFaculty(facultyId: string): Promise<any> {
        // Validate faculty exists
        const facultyValidationError = await this.validateFaculty(facultyId);
        if (facultyValidationError) return facultyValidationError;

        const programs = await this.universityRepository.getProgramsByFacultyId(facultyId);
        return this.formatResponse(HttpStatus.OK, `Programs for faculty ${facultyId} retrieved successfully`, programs);
    }

    async getOne(id: string): Promise<any> {
        const program = await this.universityRepository.getProgramById(id);
        if (!program) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Program with ID ${id} not found`, null);
        }
        return this.formatResponse(HttpStatus.OK, `Program with ID ${id} retrieved successfully`, program);
    }

    async update(id: string, updateProgramDto: UpdateProgramDto): Promise<any> {
        const existingProgram = await this.universityRepository.getProgramById(id);
        if (!existingProgram) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Program with ID ${id} not found`, null);
        }

        // Validate university if provided
        if (updateProgramDto.universityId) {
            const universityValidationError = await this.validateUniversity(updateProgramDto.universityId);
            if (universityValidationError) return universityValidationError;
        }

        // Validate faculty if provided
        if (updateProgramDto.facultyId) {
            const facultyValidationError = await this.validateFaculty(updateProgramDto.facultyId);
            if (facultyValidationError) return facultyValidationError;
        }

        // Validate certificate requirement if provided
        if (updateProgramDto.certificateRequirementId) {
            const certValidationError = await this.validateCertificateRequirement(
                updateProgramDto.certificateRequirementId,
            );
            if (certValidationError) return certValidationError;
        }

        const updatedProgram = await this.universityRepository.updateProgram(id, updateProgramDto);
        return this.formatResponse(HttpStatus.OK, `Program with ID ${id} updated successfully`, updatedProgram);
    }

    async delete(id: string): Promise<any> {
        const existingProgram = await this.universityRepository.getProgramById(id);
        if (!existingProgram) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `Program with ID ${id} not found`, null);
        }

        await this.universityRepository.deleteProgram(id);
        return this.formatResponse(HttpStatus.OK, `Program with ID ${id} deleted successfully`, null);
    }
}
