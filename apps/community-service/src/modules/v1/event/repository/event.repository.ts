// event.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { Event, EventRegistrationStudent } from '../interface/event.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';

@Injectable()
export class EventRepository extends BaseRepository<Event, CreateEventDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.EVENT);
    }

    async createEvent(dto: any): Promise<any> {
        const { branchId, ...cleanedDto } = dto;
        return super.create(cleanedDto);
    }

    async createEventRegistrationStudent(dto: any): Promise<void> {
        await this.knex(TableNames.EVENT_REGISTRATION_STUDENT).insert(dto).returning('*');
    }

    async getAll(filter?: EventFilterDto & { page?: number; limit?: number }): Promise<{ data: Event[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        const { page, limit, ...restFilter } = filter || {};
        
        // If there are any filter conditions, apply them
        if (Object.keys(restFilter || {}).length > 0) {
            const [totalItems] = await this.knex(this.tableName)
                .where(restFilter)
                .count('* as count');
            
            const offset = ((page || 1) - 1) * (limit || 10);
            const data = await this.knex(this.tableName)
                .where(restFilter)
                .select('*')
                .offset(offset)
                .limit(limit || 10);

            const totalPages = Math.ceil(Number(totalItems.count) / (limit || 10));

            return {
                data,
                pagination: {
                    totalItems: Number(totalItems.count),
                    itemsPerPage: limit || 10,
                    currentPage: page || 1,
                    totalPages,
                }
            };
        }

        // If no filters, use base implementation
        return super.getAll({ page, limit });
    }

    async getOne(id: string): Promise<any> {
        return super.getOne(id);
    }

    async updateEvent(id: string, dto: any): Promise<any> {
        return super.update(id, dto);
    }

    async updateEventRegistrationStudent(id: string, dto: any): Promise<any> {
        return this.knex(TableNames.EVENT_REGISTRATION_STUDENT).where('eventId', id).update(dto).returning('*');
    }

    async deleteEventRegistrationStudent(eventId: string, studentId: string): Promise<any> {
        return this.knex(TableNames.EVENT_REGISTRATION_STUDENT).where({ eventId, studentId }).delete().returning('*');
    }

    async delete(id: string): Promise<any> {
        return super.delete(id);
    }
}
