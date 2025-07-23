import { Injectable, HttpStatus } from '@nestjs/common';
import { TimetableRepository } from '../repository/timetable.repository';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';

@Injectable()
export class TimetableService {
    constructor(private readonly timetableRepository: TimetableRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    async create(createTimetableDto: CreateTimetableDto): Promise<any> {
        try {
            const createdTimetable = await this.timetableRepository.createTimetable(createTimetableDto);
            return this.formatResponse(HttpStatus.CREATED, 'Timetable created successfully', createdTimetable);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, 'Failed to create timetable', error.message);
        }
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        try {
            const data = await this.timetableRepository.getAllTimetables(paginationParams);
            return this.formatResponse(HttpStatus.OK, 'Timetables retrieved successfully', data);
        } catch (error) {
            return this.formatResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve timetables', error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const timetable = await this.timetableRepository.getTimetableById(id);
            return this.formatResponse(HttpStatus.OK, 'Timetable retrieved successfully', timetable);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, 'Timetable not found', error.message);
        }
    }

    async update(id: string, updateTimetableDto: UpdateTimetableDto): Promise<any> {
        try {
            const updatedTimetable = await this.timetableRepository.updateTimetable(id, updateTimetableDto);
            return this.formatResponse(HttpStatus.OK, 'Timetable updated successfully', updatedTimetable);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, 'Failed to update timetable', error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.timetableRepository.deleteTimetable(id);
            return this.formatResponse(HttpStatus.OK, 'Timetable deleted successfully', null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, 'Failed to delete timetable', error.message);
        }
    }
}
