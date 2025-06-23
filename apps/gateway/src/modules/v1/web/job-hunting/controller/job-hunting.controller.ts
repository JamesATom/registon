// job-hunting.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { JobHuntingService } from '../service/job-hunting.service';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Job Hunting')
@Controller('job-hunting/web')
export class JobHuntingController {
    constructor(private readonly jobHuntingService: JobHuntingService) {}

    @Post()
    @ApiCreate('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async create(@Body(CityValidationPipe) createJobHuntingDto: CreateJobHuntingDto, @Req() req: CustomRequest) {
        return this.jobHuntingService.create(createJobHuntingDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Job Hunting', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.jobHuntingService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.jobHuntingService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Job Hunting', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body(CityValidationPipe) updateJobHuntingDto: UpdateJobHuntingDto,
        @Req() req: CustomRequest
    ) {
        return this.jobHuntingService.update(id, updateJobHuntingDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Job Hunting')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.jobHuntingService.delete(id);
    }
}
