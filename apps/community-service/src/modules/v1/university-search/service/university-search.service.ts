import { Injectable, HttpStatus } from '@nestjs/common';
import { UniversitySearchRepository } from '../repository/university-search.repository';
import { CreateUniversitySearchDto } from '../dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from '../dto/update-university-search.dto';
import { FilterUniversitySearchDto } from '../dto/filter-university-search.dto';

@Injectable()
export class UniversitySearchService {
    constructor(private readonly universitySearchRepository: UniversitySearchRepository) {}

    async create(createUniversitySearchDto: CreateUniversitySearchDto): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'University created successfully',
            data: await this.universitySearchRepository.create(createUniversitySearchDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Universities retrieved successfully',
            data: await this.universitySearchRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `University with ID ${id} retrieved successfully`,
            data: await this.universitySearchRepository.getOne(id),
        };
    }

    async update(id: string, updateUniversitySearchDto: UpdateUniversitySearchDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `University with ID ${id} updated successfully`,
            data: await this.universitySearchRepository.update(id, updateUniversitySearchDto),
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `University with ID ${id} deleted successfully`,
            data: await this.universitySearchRepository.delete(id),
        };
    }

    async filter(filterDto: FilterUniversitySearchDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Filtered universities retrieved successfully',
            data: await this.universitySearchRepository.filter(filterDto),
        };
    }
}
