// event.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
    ApiAuth,
    ApiGetAll,
    ApiGetOne,
    ApiCreate,
    ApiUpdate,
    ApiDelete,
} from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { EventService } from './service/event.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @ApiCreate('Event', CommonEntity)
    @ApiBody({ type: CreateEventDto })
    async create(@Body() createEventDto: CreateEventDto,  @Req() req: CustomRequest) {
        return this.eventService.create(createEventDto, req.user);
    }

    @Get()
    @ApiGetAll('Event', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(@Query() filter: EventFilterDto, @Req() req: CustomRequest) {
        return this.eventService.getAll(filter, req?.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventService.getOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    //     return this.eventService.update(+id, updateEventDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.eventService.remove(+id);
    // }
}
