import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CalendarService } from '../service/calendar.service';
import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiCreate, ApiGetAll, ApiGetOne, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { CalendarEntity } from '../entity/timetable.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - TimeTable - Calendar')
@ApiExtraModels(CommonEntity, CalendarEntity)
@Controller('calendar/web')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Get()
    @ApiGetAll('Calendar entries', CalendarEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Calendar entries` })
    @ApiResponse({
        status: 200,
        description: 'List of Calendar entries',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Calendar entries' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(CalendarEntity) }
                }
            }
        }
    })

    async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
        return await this.calendarService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiGetOne('Calendar entry', CalendarEntity)
    @ApiOperation({ summary: `Get Calendar entry by ID` })
    @ApiResponse({
        status: 200,
        description: 'Calendar entry details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Calendar entry details' },
                data: { $ref: getSchemaPath(CalendarEntity) }
            }
        }
    })
    async getById(@Param('id') id: string) {
        return await this.calendarService.getById(id);
    }

    @Post()
    @ApiCreate('Calendar entry', CreateCalendarDto)
    @ApiOperation({ summary: `Create a new Calendar entry` })
    @ApiBody({ type: CreateCalendarDto })
    @ApiResponse({
        status: 201,
        description: 'Calendar entry created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Calendar entry created successfully' },
                data: { $ref: getSchemaPath(CalendarEntity) }
            }
        }
    })
    async create(@Body() createCalendarDto: CreateCalendarDto) {
        return await this.calendarService.create(createCalendarDto);
    }
}
