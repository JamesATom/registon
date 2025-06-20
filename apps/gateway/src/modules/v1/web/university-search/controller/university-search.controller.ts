import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UniversitySearchService } from '../service/university-search.service';
import { CreateUniversitySearchDto } from '../dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from '../dto/update-university-search.dto';
import { FilterUniversitySearchDto } from '../dto/filter-university-search.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { UniType, StudyLanguage, StudyType } from 'src/modules/v1/web/university-search/enums/university.enum';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search')
@Controller('university-search/web')
export class UniversitySearchController {
    constructor(private readonly universitySearchService: UniversitySearchService) {}

    @Post()
    @ApiCreate('University')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createUniversitySearchDto: CreateUniversitySearchDto, @Req() req: CustomRequest) {
        return this.universitySearchService.create(createUniversitySearchDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('University', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async findAll() {
        return this.universitySearchService.findAll();
    }

    @Get('filter')
    @ApiOperation({ summary: 'Filter universities' })
    @ApiQuery({ name: 'searchTerm', required: false, type: String })
    @ApiQuery({ name: 'type', required: false, enum: UniType })
    @ApiQuery({ name: 'cityId', required: false, type: String })
    @ApiQuery({ name: 'certificateRequirementId', required: false, type: String })
    @ApiQuery({ name: 'studyLanguages', required: false, enum: StudyLanguage, isArray: true })
    @ApiQuery({ name: 'studyTypes', required: false, enum: StudyType, isArray: true })
    @ApiResponse({ type: [CommonEntity] })
    async filter(@Query() filterUniversitySearchDto: FilterUniversitySearchDto) {
        return this.universitySearchService.filter(filterUniversitySearchDto);
    }

    @Get(':id')
    @ApiGetOne('University')
    @ApiParam({ name: 'id', description: 'University ID' })
    @ApiResponse({ type: CommonEntity })
    async findOne(@Param('id') id: string) {
        return this.universitySearchService.findOne(id);
    }

    @Put(':id')
    @ApiUpdate('University', CommonEntity)
    @ApiParam({ name: 'id', description: 'University ID' })
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string,
        @Body() updateUniversitySearchDto: UpdateUniversitySearchDto,
        @Req() req: CustomRequest
    ) {
        return this.universitySearchService.update(id, updateUniversitySearchDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('University')
    @ApiParam({ name: 'id', description: 'University ID' })
    @ApiResponse({ type: CommonEntity })
    async remove(@Param('id') id: string) {
        return this.universitySearchService.remove(id);
    }
}
