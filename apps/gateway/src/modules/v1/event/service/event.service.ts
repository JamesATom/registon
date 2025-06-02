// event.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';

@Injectable()
export class EventService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async create(createEventDto: CreateEventDto, user: any) {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { ...createEventDto, createdBy: userId };

        return this.client.send(MessagePatterns.Event.V1.CREATE, updatedDto).toPromise();
    }

    async getAll(filter: EventFilterDto, userId: string) {
        return this.client.send(MessagePatterns.Event.V1.GET_ALL, { filter, userId }).toPromise();
    }

    async getOne(id: string) {
        return this.client.send(MessagePatterns.Event.V1.GET_ONE, id).toPromise();
    }

    // update(id: number, updateEventDto: UpdateEventDto) {
    //     return `This action updates a #${id} event`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} event`;
    // }
}
