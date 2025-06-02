// survey.controller.ts
import { Controller, Get, Post, Put, Body, UseGuards, Req, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import {
    ApiAuth,
    ApiGetAll,
    ApiGetOne,
    ApiCreate,
    ApiUpdate,
    ApiDelete,
} from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { SurveyService } from './service/survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller({ path: 'survey', version: 'v1' })
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'survey-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiCreate('Presigned Upload URL')
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.surveyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Survey', CommonEntity)
    @ApiBody({ type: CreateSurveyDto })
    async create(@Body() createSurveyDto: CreateSurveyDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.create(createSurveyDto, req.user);
    }

    @Get()
    @ApiGetAll('Survey', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(@Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.getAll(req?.user?.userId);
    }

    @Get(':id')
    @ApiGetOne('Survey')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.surveyService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Survey', CommonEntity)
    @ApiBody({ type: UpdateSurveyDto })
    async update(
        @Param('id') id: string,
        @Body() updateSurveyDto: UpdateSurveyDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.surveyService.update(id, updateSurveyDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('Survey')
    @ApiOkResponse({ type: CommonEntity })
    async remove(@Param('id') id: string): Promise<CommonEntity> {
        return this.surveyService.delete(id);
    }

    @Post('submit')
    @ApiCreate('Submit Survey', CommonEntity)
    @ApiBody({ type: SubmitSurveyDto })
    async submitSurvey(
        @Body() submitSurveyDto: SubmitSurveyDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.surveyService.submitSurvey(submitSurveyDto, req.user);
    }
}
