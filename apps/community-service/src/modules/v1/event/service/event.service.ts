// event.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { EventRepository } from '../repository/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) {}

    async create(createEventDto: CreateEventDto): Promise<CommonEntity> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Event created successfully',
            data: await this.eventRepository.create(createEventDto, { lean: true }),
        };
    }

    async getAll(filter: EventFilterDto, userId: string): Promise<CommonEntity> {
        const events = await this.eventRepository.getAll(filter, { lean: true });

        const dataWithFlag = events.map(event => ({
            ...event,
            hasRegistered: (event.students || []).some(id => id.toString() === userId),
        }));

        return {
            statusCode: HttpStatus.OK,
            message: 'Events retrieved successfully',
            data: dataWithFlag,
        };
    }

    async getOne(id: string): Promise<CommonEntity> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event retrieved successfully',
            data: (await this.eventRepository.getOne(id, { lean: true })) || {},
        };
    }

    async update(id: string, updateEventDto: UpdateEventDto): Promise<CommonEntity> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event updated successfully',
            data: await this.eventRepository.update(id, updateEventDto, { lean: true }),
        };
    }

    async delete(id: string): Promise<CommonEntity> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Event deleted successfully',
            data: await this.eventRepository.delete(id, { lean: true }),
        };
    }
}
