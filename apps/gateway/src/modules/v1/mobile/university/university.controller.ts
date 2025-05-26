import { Controller, Get, Post, Param, Body, Request, UseGuards } from '@nestjs/common';
import { UniversityService } from './university.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
    ApiCreateUniversityApply,
    ApiFilterUniversities,
    ApiGetMyApplies,
    ApiGetOneApply,
    ApiGetUniversityById,
} from './decorators/api-docs.decorators';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUniversityApplyDto } from './dto/create-universityApply.dto';
import { FilterUniversitiesDto } from './dto/filter-university.dto';

@ApiTags('Universities')
@ApiBearerAuth()
@Controller('mobile/universities')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post('apply')
    @ApiCreateUniversityApply()
    @ApiBody({ type: CreateUniversityApplyDto })
    @UseGuards(AuthGuard)
    async createUniversityApply(@Body() data: CreateUniversityApplyDto, @Request() req: any) {
        return this.universityService.createUniversityApply(data, req.user?.userId);
    }

    @Get('apply')
    @ApiGetMyApplies()
    @UseGuards(AuthGuard)
    async getMyApplies(@Request() req: any) {
        return this.universityService.getMyApplies(req.user?.userId);
    }

    @Get('apply/:id')
    @ApiGetOneApply()
    @UseGuards(AuthGuard)
    async getOneApply(@Param('id') id: string, @Request() req: any) {
        return this.universityService.getOneApply(id, req.user?.userId);
    }

    @Post('filter')
    @ApiFilterUniversities()
    @UseGuards(AuthGuard)
    async findAllUniversities(@Body() filters: FilterUniversitiesDto) {
        return this.universityService.findAllUniversities(filters);
    }

    @Get(':id')
    @ApiGetUniversityById()
    @UseGuards(AuthGuard)
    async findUniversityById(@Param('id') id: string) {
        return this.universityService.findUniversityById(id);
    }
}
