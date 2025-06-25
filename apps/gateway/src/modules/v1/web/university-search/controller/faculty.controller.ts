// faculty.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FacultyService } from '../service/faculty.service';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Faculty')
@Controller('university-search/faculty/web')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Post()
    @ApiCreate('Faculty')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createFacultyDto: CreateFacultyDto, @Req() req: CustomRequest) {
        return this.facultyService.create(createFacultyDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Faculty', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.facultyService.getAll();
    }

    @Get('university/:universityId')
    @ApiResponse({ type: [CommonEntity] })
    async getAllByUniversity(@Param('universityId') universityId: string) {
        return this.facultyService.getAllByUniversity(universityId);
    }

    @Get(':id')
    @ApiGetOne('Faculty')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.facultyService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Faculty', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateFacultyDto: UpdateFacultyDto,
        @Req() req: CustomRequest
    ) {
        return this.facultyService.update(id, updateFacultyDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Faculty')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.facultyService.delete(id);
    }
}
