// university.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { UniversityService } from '../service/university.service';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search')
@Controller('university-search/university/web')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post()
    @ApiCreate('University')
    @ApiResponse({ type: CommonEntity })
    async create(@Body(CityValidationPipe) createUniversityDto: CreateUniversityDto, @Req() req: CustomRequest) {
        return this.universityService.create(createUniversityDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('University', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.universityService.getAll();
    }

    @Get(':id')
    @ApiGetOne('University')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.universityService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('University', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body(CityValidationPipe) updateUniversityDto: UpdateUniversityDto,
        @Req() req: CustomRequest
    ) {
        return this.universityService.update(id, updateUniversityDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('University')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.universityService.delete(id);
    }

    @Post('presigned-url')
    @ApiResponse({ type: CommonEntity })
    async generatePresignedUrlForLogo(@Body() createPresignedUrlDto: CreatePresignedUrlDto) {
        return this.universityService.generatePresignedUploadUrlForLogo(createPresignedUrlDto);
    }
}
