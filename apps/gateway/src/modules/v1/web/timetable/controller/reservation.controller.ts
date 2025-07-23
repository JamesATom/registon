import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { ReservationEntity } from '../entity/timetable.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - TimeTable - Reservations')
@ApiExtraModels(CommonEntity, ReservationEntity)
@Controller('reservations/web')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Get()
    @ApiGetAll('Reservations', ReservationEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Reservations` })
    @ApiResponse({
        status: 200,
        description: 'List of Reservations',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Reservations' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ReservationEntity) }
                }
            }
        }
    })
    async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
        return await this.reservationService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiGetOne('Reservation', ReservationEntity)
    @ApiOperation({ summary: `Get Reservation by ID` })
    @ApiResponse({
        status: 200,
        description: 'Reservation details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Reservation details' },
                data: { $ref: getSchemaPath(ReservationEntity) }
            }
        }
    })
    async getById(@Param('id') id: string) {
        return await this.reservationService.getById(id);
    }

    @Post()
    @ApiCreate('Reservation', CreateReservationDto,)
    @ApiOperation({ summary: `Create a new Reservation` })
    @ApiBody({ type: CreateReservationDto })
    @ApiResponse({
        status: 201,
        description: 'Reservation created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Reservation created successfully' },
                data: { $ref: getSchemaPath(ReservationEntity) }
            }
        }
    })
    async create(@Body() createReservationDto: CreateReservationDto, @Req() req: CustomRequest) {
        return await this.reservationService.create(createReservationDto, req.user.sub);
    }

    @Put(':id')
    @ApiUpdate('Reservation', UpdateReservationDto)
    @ApiOperation({ summary: `Update Reservation by ID` })
    @ApiBody({ type: UpdateReservationDto })
    @ApiResponse({
        status: 200,
        description: 'Reservation updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Reservation updated successfully' },
                data: { $ref: getSchemaPath(ReservationEntity) }
            }
        }
    })
    async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Req() req: CustomRequest) {
        return await this.reservationService.update(id, updateReservationDto, req.user.sub);
    }

    @Delete(':id')
    @ApiDelete('Reservation')
    @ApiOperation({ summary: `Delete Reservation by ID` })
    @ApiResponse({
        status: 200,
        description: 'Reservation deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Reservation deleted successfully' },
                data: { type: 'null' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return await this.reservationService.delete(id);
    }
}
