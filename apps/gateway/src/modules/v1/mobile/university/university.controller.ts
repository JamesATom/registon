//university.controller.ts
import { Controller, Get, Post, Param, Body, Request, UseGuards } from '@nestjs/common';
import { UniversityService } from './university.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
    ApiCreateUniversityApply,
    ApiFilterUniversities,
    ApiGetMyApplies,
    ApiGetOneApply,
    ApiGetUniversityById,
} from './decorators/api-docs.decorators';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CreateUniversityApplyDto } from './dto/create-universityApply.dto';
import { FilterUniversitiesDto } from './dto/filter-university.dto';
import { ApiAuth } from 'src/common/swagger/common-swagger';

@ApiTags('Universities')
@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller('mobile/universities')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post('apply')
    @ApiCreateUniversityApply()
    @ApiBody({ type: CreateUniversityApplyDto })
    async createUniversityApply(@Body() data: CreateUniversityApplyDto, @Request() req: any) {
        return this.universityService.createUniversityApply(data, req.user?.userId);
    }

    @Get('apply')
    @ApiGetMyApplies()
    async getMyApplies(@Request() req: any) {
        return this.universityService.getMyApplies(req.user?.userId);
    }

    @Get('apply/:id')
    @ApiGetOneApply()
    async getOneApply(@Param('id') id: string, @Request() req: any) {
        return this.universityService.getOneApply(id, req.user?.userId);
    }

    @Post('filter')
    @ApiFilterUniversities()
    async findAllUniversities(@Body() filters: FilterUniversitiesDto) {
        return this.universityService.findAllUniversities(filters);
    }

    @Get(':id')
    @ApiGetUniversityById()
    async findUniversityById(@Param('id') id: string) {
        return this.universityService.findUniversityById(id);
    }
}
