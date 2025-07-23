import { Injectable, HttpStatus } from '@nestjs/common';
import { TimetableRepository } from '../repository/timetable.repository';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@Injectable()
export class ReservationService {
    constructor(private readonly timetableRepository: TimetableRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    private async validateCalendar(calendarId: string) {
        try {
            await this.timetableRepository.getCalendarById(calendarId);
            return null;
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Calendar with ID ${calendarId} does not exist`, null);
        }
    }

    async create(createReservationDto: CreateReservationDto): Promise<any> {
        const calendarValidationError = await this.validateCalendar(createReservationDto.reservationCalendarId);
        if (calendarValidationError) return calendarValidationError;

        try {
            const createdReservation = await this.timetableRepository.createReservation(createReservationDto);
            return this.formatResponse(HttpStatus.CREATED, 'Reservation created successfully', createdReservation);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, 'Failed to create reservation', error.message);
        }
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        try {
            const data = await this.timetableRepository.getAllReservations(paginationParams);
            return this.formatResponse(HttpStatus.OK, 'Reservations retrieved successfully', data);
        } catch (error) {
            return this.formatResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve reservations', error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const reservation = await this.timetableRepository.getReservationById(id);
            return this.formatResponse(HttpStatus.OK, 'Reservation retrieved successfully', reservation);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, 'Reservation not found', error.message);
        }
    }

    async update(id: string, updateReservationDto: UpdateReservationDto): Promise<any> {
        try {
            const updatedReservation = await this.timetableRepository.updateReservation(id, updateReservationDto);
            return this.formatResponse(HttpStatus.OK, 'Reservation updated successfully', updatedReservation);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, 'Failed to update reservation', error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.timetableRepository.deleteReservation(id);
            return this.formatResponse(HttpStatus.OK, 'Reservation deleted successfully', null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, 'Failed to delete reservation', error.message);
        }
    }
}
