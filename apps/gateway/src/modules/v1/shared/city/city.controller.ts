// city.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { CityService } from './service/city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('City')
@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get()
    @ApiGetAll('City', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async findAll() {
        return this.cityService.getAll();
    }

    @Get(':id')
    @ApiGetOne('City')
    @ApiOkResponse({ type: CommonEntity })
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.cityService.getOne(id);
    }

    @Post()
    @ApiCreate('City', CommonEntity)
    @ApiCreatedResponse({ type: CommonEntity })
    async create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @Put(':id')
    @ApiUpdate('City', CommonEntity)
    @ApiOkResponse({ type: CommonEntity })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCityDto: UpdateCityDto,
    ) {
        return this.cityService.update(id, updateCityDto);
    }

    @Delete(':id')
    @ApiDelete('City')
    @ApiOkResponse({ type: CommonEntity })
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.cityService.delete(id);
    }
}
