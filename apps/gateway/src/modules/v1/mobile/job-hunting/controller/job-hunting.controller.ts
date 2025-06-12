import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JobHuntingService } from '../service/job-hunting.service';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { FilterJobHuntingDto } from '../dto/filter-job-hunting.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - Job Hunting')
@Controller('job-hunting/mobile')
export class JobHuntingController {
    constructor(private readonly jobHuntingService: JobHuntingService) {}

    @Post()
    @ApiCreate('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createJobHuntingDto: CreateJobHuntingDto, @Req() req: CustomRequest) {
        return this.jobHuntingService.create(createJobHuntingDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Job Hunting', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async findAll() {
        return this.jobHuntingService.findAll();
    }

    @Get('filter')
    @ApiOperation({ summary: 'Filter job listings' })
    @ApiResponse({ type: [CommonEntity] })
    async filter(@Query() filterJobHuntingDto: FilterJobHuntingDto) {
        return this.jobHuntingService.filter(filterJobHuntingDto);
    }

    @Get(':id')
    @ApiGetOne('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async findOne(@Param('id') id: string) {
        return this.jobHuntingService.findOne(id);
    }

    @Put(':id')
    @ApiUpdate('Job Hunting', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateJobHuntingDto: UpdateJobHuntingDto,
        @Req() req: CustomRequest
    ) {
        return this.jobHuntingService.update(id, updateJobHuntingDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async remove(@Param('id') id: string) {
        return this.jobHuntingService.remove(id);
    }
}
