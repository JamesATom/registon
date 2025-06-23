// event.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { CourseValidationPipe } from 'src/common/pipes/validation/course-validation.pipe';
import { CustomRequest } from 'src/common/types/types';
import { EventService } from './service/event.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Event')
@Controller('web/event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'event-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiCreate('Presigned Upload URL')
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.eventService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Event', CommonEntity)
    @ApiBody({ type: CreateEventDto })
    async create(
        @Body(BranchValidationPipe, CourseValidationPipe) createEventDto: CreateEventDto, 
        @Req() req: CustomRequest
    ) {
        return this.eventService.create(createEventDto, req.user);
    }

    @Get()
    @ApiGetAll('Event', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(@Query() filter: EventFilterDto, @Req() req: CustomRequest) {
        return this.eventService.getAll(filter, req?.user);
    }

    @Get(':id')
    @ApiGetOne('Event')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.eventService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Event', CommonEntity)
    @ApiBody({ type: UpdateEventDto })
    async update(
        @Param('id') id: string, 
        @Body(BranchValidationPipe, CourseValidationPipe) updateEventDto: UpdateEventDto, 
        @Req() req: CustomRequest
    ) {
        return this.eventService.update(id, updateEventDto, req?.user);
    }

    @Delete(':id')
    @ApiDelete('Event')
    async delete(@Param('id') id: string) {
        return this.eventService.delete(id);
    }
}
