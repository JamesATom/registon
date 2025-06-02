// event.service.ts
import { Injectable } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { EventRepository } from '../repository/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) {}

    async create(createEventDto: CreateEventDto): Promise<CommonEntity> {
        return {
            statusCode: 201,
            message: 'Event created successfully',
            data: await this.eventRepository.create(createEventDto, { lean: true }),
        }
    }

    async getAll(filter: EventFilterDto, userId: string): Promise<CommonEntity> {
        const events = await this.eventRepository.getAll(filter, { lean: true });

        const dataWithFlag = events.map(event => ({
            ...event,
            hasRegistered: (event.students || []).some(id => id.toString() === userId),
        }));

        return {
            statusCode: 200,
            message: 'Events retrieved successfully',
            data: dataWithFlag
        }
    }

    async getOne(id: string): Promise<CommonEntity> {
        return {
            statusCode: 200,
            message: 'Event retrieved successfully',
            data: await this.eventRepository.getOne(id, { lean: true }),
        }
    }

    // update(id: number, updateEventDto: UpdateEventDto) {
    //     return `This action updates a #${id} event`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} event`;
    // }
}
