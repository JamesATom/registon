// survey.controller.ts
import { Controller, Get, Post, Put, Body, UseGuards, Req, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { SurveyService } from './service/survey.service';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { CreatePresignedUrlEntity } from './entity/create-presigned-url.entity';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller({ path: 'survey', version: '1' })
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post('presigned-upload')
    @ApiBody({ 
        type: CreatePresignedUrlDto,
        examples: { 
            'application/json': { 
                value: { 
                    filename: 'survey-image.jpg',
                    contentType: 'image/jpeg'
                } 
            } 
        } 
    })
    @ApiCreate('Presigned Upload URL', CreatePresignedUrlEntity)
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CreatePresignedUrlEntity> {
        return this.surveyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Survey', CommonEntity)
    @ApiBody({ type: [CreateSurveyDto] })
    async create(@Body() createSurveyDto: CreateSurveyDto[], @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.create(createSurveyDto, req.user);
    }

    @Put(':id')
    @ApiUpdate('Survey', CommonEntity)
    @ApiBody({ type: UpdateSurveyDto })
    async update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.update(id, updateSurveyDto, req.user);
    }

    @Get()
    @ApiGetAll('Survey', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(): Promise<CommonEntity> {
        return this.surveyService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Survey')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.surveyService.getOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    //     return this.surveyService.update(+id, updateSurveyDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.surveyService.remove(+id);
    // }
}
