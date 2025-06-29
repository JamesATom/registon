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

    async getAll(filter?: EventFilterDto): Promise<any> {
        return super.getAll();
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
