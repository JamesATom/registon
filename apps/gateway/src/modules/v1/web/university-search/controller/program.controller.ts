// program.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProgramService } from '../service/program.service';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Program')
@Controller('university-search/program/web')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

    @Post()
    @ApiCreate('Program')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createProgramDto: CreateProgramDto, @Req() req: CustomRequest) {
        return this.programService.create(createProgramDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Program', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.programService.getAll();
    }

    @Get('university/:universityId')
    @ApiResponse({ type: [CommonEntity] })
    async getAllByUniversity(@Param('universityId') universityId: string) {
        return this.programService.getAllByUniversity(universityId);
    }

    @Get('faculty/:facultyId')
    @ApiResponse({ type: [CommonEntity] })
    async getAllByFaculty(@Param('facultyId') facultyId: string) {
        return this.programService.getAllByFaculty(facultyId);
    }

    @Get(':id')
    @ApiGetOne('Program')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.programService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Program', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateProgramDto: UpdateProgramDto,
        @Req() req: CustomRequest
    ) {
        return this.programService.update(id, updateProgramDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Program')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.programService.delete(id);
    }
}
