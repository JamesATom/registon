// event.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { EventService } from './service/event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RegisterForEventDto } from './dto/register-for-event.dto';

@Controller()
export class EventEvent {
    constructor(private readonly eventService: EventService) {}

    @MessagePattern(MessagePatterns.Event.V1.CREATE)
    async create(@Payload() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ALL)
    async getAll(@Payload() filter: EventFilterDto) {
        return this.eventService.getAll(filter);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ONE)
    async getOne(@Payload() id: string) {
        return this.eventService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Event.V1.UPDATE)
    async update(@Payload() { id, updateEventDto }: { id: string; updateEventDto: UpdateEventDto }) {
        return this.eventService.update(id, updateEventDto);
    }

    @MessagePattern(MessagePatterns.Event.V1.DELETE)
    async delete(@Payload() id: string ) {
        return this.eventService.delete(id);
    }

    // @MessagePattern(MessagePatterns.Event.V1.REGISTER_STUDENT)
    // async registerStudent(@Payload() { eventId, studentId }: { eventId: string, studentId: string }) {
    //     return this.eventService.registerStudent(eventId, studentId);
    // }

    // @MessagePattern(MessagePatterns.Event.V1.UNREGISTER_STUDENT)
    // async unregisterStudent(@Payload() { eventId, studentId }: { eventId: string, studentId: string }) {
    //     return this.eventService.unregisterStudent(eventId, studentId);
    // }
}
