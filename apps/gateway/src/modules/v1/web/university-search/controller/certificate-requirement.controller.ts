// certificate-requirement.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CertificateRequirementService } from '../service/certificate-requirement.service';
import { CreateCertificateRequirementDto } from '../dto/create-certificate-requirement.dto';
import { UpdateCertificateRequirementDto } from '../dto/update-certificate-requirement.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Certificate Requirement')
@Controller('university-search/certificate-requirement/web')
export class CertificateRequirementController {
    constructor(private readonly certificateRequirementService: CertificateRequirementService) {}

    @Post()
    @ApiCreate('Certificate Requirement')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createCertificateRequirementDto: CreateCertificateRequirementDto, @Req() req: CustomRequest) {
        return this.certificateRequirementService.create(createCertificateRequirementDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Certificate Requirement', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.certificateRequirementService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Certificate Requirement')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.certificateRequirementService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Certificate Requirement', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateCertificateRequirementDto: UpdateCertificateRequirementDto,
        @Req() req: CustomRequest
    ) {
        return this.certificateRequirementService.update(id, updateCertificateRequirementDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Certificate Requirement')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.certificateRequirementService.delete(id);
    }
}
