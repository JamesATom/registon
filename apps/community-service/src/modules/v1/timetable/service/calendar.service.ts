import { Injectable, HttpStatus } from '@nestjs/common';
import { TimetableRepository } from '../repository/timetable.repository';
import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { UpdateCalendarDto } from '../dto/update-calendar.dto';

@Injectable()
export class CalendarService {
    constructor(private readonly timetableRepository: TimetableRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    private async validateTimetable(timetableId: string) {
        try {
            await this.timetableRepository.getTimetableById(timetableId);
            return null;
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Timetable with ID ${timetableId} does not exist`, null);
        }
    }

    async create(createCalendarDto: CreateCalendarDto): Promise<any> {
        const timetableValidationError = await this.validateTimetable(createCalendarDto.timetableId);
        if (timetableValidationError) return timetableValidationError;

        try {
            const createdCalendar = await this.timetableRepository.createCalendar(createCalendarDto);
            return this.formatResponse(HttpStatus.CREATED, 'Calendar created successfully', createdCalendar);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, 'Failed to create calendar', error.message);
        }
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        try {
            const data = await this.timetableRepository.getAllCalendars(paginationParams);
            return this.formatResponse(HttpStatus.OK, 'Calendars retrieved successfully', data);
        } catch (error) {
            return this.formatResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve calendars', error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const calendar = await this.timetableRepository.getCalendarById(id);
            return this.formatResponse(HttpStatus.OK, 'Calendar retrieved successfully', calendar);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, 'Calendar not found', error.message);
        }
    }
}
