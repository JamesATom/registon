import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CalendarService } from '../service/calendar.service';
import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { UpdateCalendarDto } from '../dto/update-calendar.dto';

@Controller()
export class CalendarEvent {
    constructor(private readonly calendarService: CalendarService) {}

    @MessagePattern('calendar.create')
    async create(@Payload() createCalendarDto: CreateCalendarDto) {
        return await this.calendarService.create(createCalendarDto);
    }

    @MessagePattern('calendar.getAll')
    async getAll(@Payload() payload: { page?: number; limit?: number }) {
        return await this.calendarService.getAll(payload);
    }

    @MessagePattern('calendar.getById')
    async getById(@Payload() payload: { id: string }) {
        return await this.calendarService.getById(payload.id);
    }
}
