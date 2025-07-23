import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TimetableService } from '../service/timetable.service';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { TimetableEntity } from '../entity/timetable.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Timetable')
@ApiExtraModels(CommonEntity, TimetableEntity)
@Controller('timetable/web')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) {}

    @Get()
    @ApiGetAll('Timetables', TimetableEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Timetables` })
    @ApiResponse({
        status: 200,
        description: 'List of Timetables',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Timetables' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(TimetableEntity) }
                }
            }
        }
    })
    async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
        return await this.timetableService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiGetOne('Timetable', TimetableEntity)
    @ApiOperation({ summary: `Get Timetable by ID` })
    @ApiResponse({
        status: 200,
        description: 'Timetable details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Timetable details' },
                data: { $ref: getSchemaPath(TimetableEntity) }
            }
        }
    })
    async getById(@Param('id') id: string) {
        return await this.timetableService.getById(id);
    }

    @Post()
    @ApiCreate('Timetable', CreateTimetableDto)
    @ApiOperation({ summary: `Create a new Timetable` })
    @ApiBody({ type: CreateTimetableDto })
    @ApiResponse({
        status: 201,
        description: 'Timetable created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Timetable created successfully' },
                data: { $ref: getSchemaPath(TimetableEntity) }
            }
        }
    })
    async create(@Body() createTimetableDto: CreateTimetableDto, @Req() req: CustomRequest) {
        return await this.timetableService.create(createTimetableDto, req.user.sub);
    }

    @Put(':id')
    @ApiUpdate('Timetable', UpdateTimetableDto)
    @ApiOperation({ summary: `Update Timetable by ID` })
    @ApiBody({ type: UpdateTimetableDto })
    @ApiResponse({
        status: 200,
        description: 'Timetable updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Timetable updated successfully' },
                data: { $ref: getSchemaPath(TimetableEntity) }
            }
        }
    })
    async update(@Param('id') id: string, @Body() updateTimetableDto: UpdateTimetableDto, @Req() req: CustomRequest) {
        return await this.timetableService.update(id, updateTimetableDto, req.user.sub);
    }

    @Delete(':id')
    @ApiDelete('Timetable')
    @ApiOperation({ summary: `Delete Timetable by ID` })
    @ApiResponse({
        status: 200,
        description: 'Timetable deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Timetable deleted successfully' },
                data: { type: 'null' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return await this.timetableService.delete(id);
    }
}
