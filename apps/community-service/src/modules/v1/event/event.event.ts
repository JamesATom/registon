// event.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { EventService } from './service/event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller()
export class EventEvent {
    constructor(private readonly eventService: EventService) {}

    @MessagePattern(MessagePatterns.Event.V1.CREATE)
    async create(@Payload() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ALL)
    async getAll(@Payload() filter: EventFilterDto) {
    	return this.eventService.getAll(filter, filter.userId);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ONE)
    async getOne(@Payload() id: string) {
    	return this.eventService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Event.V1.UPDATE)
    async update(@Payload() { id, updateEventDto }: { id: string, updateEventDto: UpdateEventDto }) {
    	return this.eventService.update(id, updateEventDto);
    }

    @MessagePattern(MessagePatterns.Event.V1.DELETE)
    async delete(@Payload() id: string) {
    	return this.eventService.delete(id);
    }
}
