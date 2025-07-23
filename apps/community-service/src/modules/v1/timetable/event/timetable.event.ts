import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TimetableService } from '../service/timetable.service';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';

@Controller()
export class TimetableEvent {
    constructor(private readonly timetableService: TimetableService) {}

    @MessagePattern('timetable.create')
    async create(@Payload() createTimetableDto: CreateTimetableDto) {
        return await this.timetableService.create(createTimetableDto);
    }

    @MessagePattern('timetable.getAll')
    async getAll(@Payload() payload: { page?: number; limit?: number }) {
        return await this.timetableService.getAll(payload);
    }

    @MessagePattern('timetable.getById')
    async getById(@Payload() payload: { id: string }) {
        return await this.timetableService.getById(payload.id);
    }

    @MessagePattern('timetable.update')
    async update(@Payload() payload: { id: string; updateTimetableDto: UpdateTimetableDto }) {
        return await this.timetableService.update(payload.id, payload.updateTimetableDto);
    }

    @MessagePattern('timetable.delete')
    async delete(@Payload() payload: { id: string }) {
        return await this.timetableService.delete(payload.id);
    }
}
