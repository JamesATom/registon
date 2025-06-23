// company.controller.ts
import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Company')
@Controller('company/web')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'company-logo.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiCreate('Presigned Upload URL for Company Logo')
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.companyService.generatePresignedUploadUrlForCompanyLogo(body);
    }

    @Post()
    @ApiCreate('Company')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: CustomRequest) {
        return this.companyService.create(createCompanyDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Company', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async findAll() {
        return this.companyService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Company')
    @ApiResponse({ type: CommonEntity })
    async findOne(@Param('id') id: string) {
        return this.companyService.getOne(id);
    }

    // @Get(':id/jobs')
    // @ApiOperation({ summary: 'Get a company with its job listings' })
    // @ApiResponse({ type: CommonEntity })
    // async findOneWithJobs(@Param('id') id: string) {
    //     return this.companyService.getOneWithJobs(id);
    // }

    @Put(':id')
    @ApiUpdate('Company', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateCompanyDto: UpdateCompanyDto,
        @Req() req: CustomRequest
    ) {
        return this.companyService.update(id, updateCompanyDto, req.user.userId);
    }
}
