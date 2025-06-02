// event.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { EventService } from './service/event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';

@Controller()
export class EventEvent {
    constructor(private readonly eventService: EventService) {}

    @MessagePattern(MessagePatterns.Event.V1.CREATE)
    async create(@Payload() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ALL)
    async getAll(@Payload() { filter }: { filter: EventFilterDto }, userId: string) {
    	return this.eventService.getAll(filter, userId);
    }

    @MessagePattern(MessagePatterns.Event.V1.GET_ONE)
    async findOne(@Payload() id: string) {
    	return this.eventService.getOne(id);
    }

    // @MessagePattern('updateEvent')
    // update(@Payload() updateEventDto: UpdateEventDto) {
    // 	return this.eventService.update(updateEventDto.id, updateEventDto);
    // }

    // @MessagePattern('removeEvent')
    // remove(@Payload() id: number) {
    // 	return this.eventService.remove(id);
    // }
}
