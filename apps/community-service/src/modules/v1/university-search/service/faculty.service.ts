// faculty.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { UniversityRepository } from '../repository/university.repository';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';

@Injectable()
export class FacultyService {
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
                null
            );
        }
        return null;
    }

    async create(createFacultyDto: CreateFacultyDto): Promise<any> {
        const { universityId } = createFacultyDto;
        
        // Validate university exists
        const universityValidationError = await this.validateUniversity(universityId);
        if (universityValidationError) return universityValidationError;

        const faculty = await this.universityRepository.createFaculty(createFacultyDto);
        return this.formatResponse(
            HttpStatus.CREATED, 
            'Faculty created successfully', 
            faculty
        );
    }

    async getAll(): Promise<any> {
        const faculties = await this.universityRepository.getAllFaculties();
        return this.formatResponse(
            HttpStatus.OK, 
            'Faculties retrieved successfully', 
            faculties
        );
    }

    async getAllByUniversity(universityId: string): Promise<any> {
        // Validate university exists
        const universityValidationError = await this.validateUniversity(universityId);
        if (universityValidationError) return universityValidationError;

        const faculties = await this.universityRepository.getFacultiesByUniversityId(universityId);
        return this.formatResponse(
            HttpStatus.OK, 
            `Faculties for university ${universityId} retrieved successfully`, 
            faculties
        );
    }

    async getOne(id: string): Promise<any> {
        const faculty = await this.universityRepository.getFacultyById(id);
        if (!faculty) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `Faculty with ID ${id} not found`, 
                null
            );
        }
        return this.formatResponse(
            HttpStatus.OK, 
            `Faculty with ID ${id} retrieved successfully`, 
            faculty
        );
    }

    async update(id: string, updateFacultyDto: UpdateFacultyDto): Promise<any> {
        const existingFaculty = await this.universityRepository.getFacultyById(id);
        if (!existingFaculty) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `Faculty with ID ${id} not found`, 
                null
            );
        }

        // Validate university if provided
        if (updateFacultyDto.universityId) {
            const universityValidationError = await this.validateUniversity(updateFacultyDto.universityId);
            if (universityValidationError) return universityValidationError;
        }

        const updatedFaculty = await this.universityRepository.updateFaculty(id, updateFacultyDto);
        return this.formatResponse(
            HttpStatus.OK, 
            `Faculty with ID ${id} updated successfully`, 
            updatedFaculty
        );
    }

    async delete(id: string): Promise<any> {
        const existingFaculty = await this.universityRepository.getFacultyById(id);
        if (!existingFaculty) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `Faculty with ID ${id} not found`, 
                null
            );
        }

        await this.universityRepository.deleteFaculty(id);
        return this.formatResponse(
            HttpStatus.OK, 
            `Faculty with ID ${id} deleted successfully`, 
            null
        );
    }
}
