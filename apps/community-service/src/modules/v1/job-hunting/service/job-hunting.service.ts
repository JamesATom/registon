// job-hunting.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { JobHuntingRepository } from '../repository/job-hunting.repository';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { FilterJobHuntingDto } from '../dto/filter-job-hunting.dto';

@Injectable()
export class JobHuntingService {
    constructor(private readonly jobHuntingRepository: JobHuntingRepository) {}

    async create(createJobHuntingDto: CreateJobHuntingDto): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Job listing created successfully',
            data: await this.jobHuntingRepository.create(createJobHuntingDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Job listings retrieved successfully',
            data: await this.jobHuntingRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} retrieved successfully`,
            data: await this.jobHuntingRepository.getOne(id),
        };
    }

    async update(id: string, updateJobHuntingDto: UpdateJobHuntingDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} updated successfully`,
            data: await this.jobHuntingRepository.update(id, updateJobHuntingDto),
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Job listing with ID ${id} deleted successfully`,
            data: await this.jobHuntingRepository.delete(id),
        };
    }

    async filter(filterJobHuntingDto: FilterJobHuntingDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Filtered job listings retrieved successfully',
            data: await this.jobHuntingRepository.filter(filterJobHuntingDto),
        };
    }
}
