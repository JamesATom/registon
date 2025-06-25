// university.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { UniversityRepository } from '../repository/university.repository';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';

@Injectable()
export class UniversityService {
    constructor(private readonly universityRepository: UniversityRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    async create(createUniversityDto: CreateUniversityDto): Promise<any> {
        const university = await this.universityRepository.createUniversity(createUniversityDto);
        return this.formatResponse(
            HttpStatus.CREATED, 
            'University created successfully', 
            university
        );
    }

    async getAll(): Promise<any> {
        const universities = await this.universityRepository.getAllUniversities();
        return this.formatResponse(
            HttpStatus.OK, 
            'Universities retrieved successfully', 
            universities
        );
    }

    async getOne(id: string): Promise<any> {
        const university = await this.universityRepository.getUniversityWithDetails(id);
        if (!university) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `University with ID ${id} not found`, 
                null
            );
        }
        return this.formatResponse(
            HttpStatus.OK, 
            `University with ID ${id} retrieved successfully`, 
            university
        );
    }

    async update(id: string, updateUniversityDto: UpdateUniversityDto): Promise<any> {
        const existingUniversity = await this.universityRepository.getUniversityById(id);
        if (!existingUniversity) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `University with ID ${id} not found`, 
                null
            );
        }

        const updatedUniversity = await this.universityRepository.updateUniversity(id, updateUniversityDto);
        return this.formatResponse(
            HttpStatus.OK, 
            `University with ID ${id} updated successfully`, 
            updatedUniversity
        );
    }

    async delete(id: string): Promise<any> {
        const existingUniversity = await this.universityRepository.getUniversityById(id);
        if (!existingUniversity) {
            return this.formatResponse(
                HttpStatus.NOT_FOUND, 
                `University with ID ${id} not found`, 
                null
            );
        }

        await this.universityRepository.deleteUniversity(id);
        return this.formatResponse(
            HttpStatus.OK, 
            `University with ID ${id} deleted successfully`, 
            null
        );
    }
}
