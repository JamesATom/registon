// event.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { EventService } from './service/event.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - Event')
@Controller('mobile/event')
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
    async create(@Body(BranchValidationPipe) createEventDto: CreateEventDto, @Req() req: CustomRequest): Promise<CommonEntity> {
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
}
