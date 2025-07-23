import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { RpcException } from '@nestjs/microservices';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { Timetable, Calendar, Reservation } from '../interface/timetable.interface';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';

@Injectable()
export class TimetableRepository extends BaseRepository<Timetable, CreateTimetableDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.TIMETABLE);
    }

    async createTimetable(dto: CreateTimetableDto): Promise<Timetable> {
        const created = await super.create(dto);
        return created[0];
    }

    async getAllTimetables(paginationParams?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Timetable[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [data, totalResult] = await Promise.all([
            this.knex(TableNames.TIMETABLE)
                .select('*')
                .offset(offset)
                .limit(limit)
                .orderBy('createdAt', 'desc'),
            this.knex(TableNames.TIMETABLE).count('id as count').first(),
        ]);

        const total = Number(totalResult?.count) || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }

    async getTimetableById(id: string): Promise<Timetable> {
        const timetable = await this.knex(TableNames.TIMETABLE).where('id', id).first();
        if (!timetable) {
            throw new RpcException(`Timetable with ID ${id} not found`);
        }
        return timetable;
    }

    async updateTimetable(id: string, updateData: Partial<CreateTimetableDto>): Promise<Timetable> {
        const updated = await this.knex(TableNames.TIMETABLE)
            .where('id', id)
            .update({ ...updateData, updatedAt: this.knex.fn.now() })
            .returning('*');
        
        if (updated.length === 0) {
            throw new RpcException(`Timetable with ID ${id} not found`);
        }
        return updated[0];
    }

    async deleteTimetable(id: string): Promise<void> {
        const deleted = await this.knex(TableNames.TIMETABLE).where('id', id).del();
        if (deleted === 0) {
            throw new RpcException(`Timetable with ID ${id} not found`);
        }
    }

    // Calendar methods
    async createCalendar(calendarData: CreateCalendarDto): Promise<Calendar> {
        const created = await this.knex(TableNames.CALENDAR).insert(calendarData).returning('*');
        return created[0];
    }

    async getAllCalendars(paginationParams?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Calendar[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [data, totalResult] = await Promise.all([
            this.knex(TableNames.CALENDAR)
                .select('*')
                .offset(offset)
                .limit(limit)
                .orderBy('date', 'desc'),
            this.knex(TableNames.CALENDAR).count('id as count').first(),
        ]);

        const total = Number(totalResult?.count) || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }

    async getCalendarById(id: string): Promise<Calendar> {
        const calendar = await this.knex(TableNames.CALENDAR).where('id', id).first();
        if (!calendar) {
            throw new RpcException(`Calendar with ID ${id} not found`);
        }
        return calendar;
    }

    // Reservation methods
    async createReservation(reservationData: CreateReservationDto): Promise<Reservation> {
        const created = await this.knex(TableNames.RESERVATIONS).insert(reservationData).returning('*');
        return created[0];
    }

    async getAllReservations(paginationParams?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Reservation[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [data, totalResult] = await Promise.all([
            this.knex(TableNames.RESERVATIONS)
                .select('*')
                .offset(offset)
                .limit(limit)
                .orderBy('createdAt', 'desc'),
            this.knex(TableNames.RESERVATIONS).count('id as count').first(),
        ]);

        const total = Number(totalResult?.count) || 0;
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }

    async getReservationById(id: string): Promise<Reservation> {
        const reservation = await this.knex(TableNames.RESERVATIONS).where('id', id).first();
        if (!reservation) {
            throw new RpcException(`Reservation with ID ${id} not found`);
        }
        return reservation;
    }

    async updateReservation(id: string, updateData: Partial<CreateReservationDto>): Promise<Reservation> {
        const updated = await this.knex(TableNames.RESERVATIONS)
            .where('id', id)
            .update({ ...updateData, updatedAt: this.knex.fn.now() })
            .returning('*');
        
        if (updated.length === 0) {
            throw new RpcException(`Reservation with ID ${id} not found`);
        }
        return updated[0];
    }

    async deleteReservation(id: string): Promise<void> {
        const deleted = await this.knex(TableNames.RESERVATIONS).where('id', id).del();
        if (deleted === 0) {
            throw new RpcException(`Reservation with ID ${id} not found`);
        }
    }
}
