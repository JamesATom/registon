// survey.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { SurveyService } from '../service/survey.service';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - Survey')
@Controller('survey/mobile')
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

    @Post('submit')
    @ApiCreate('Submit Survey', CommonEntity)
    @ApiBody({ type: SubmitSurveyDto })
    async submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.submitSurvey(submitSurveyDto, req.user);
    }
}
