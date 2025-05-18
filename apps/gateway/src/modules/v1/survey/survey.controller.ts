// survey.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { SurveyService } from './service/survey.service';
import { 
    CreateSurveyDto,
    CreateSurveyPresignedUploadDto } from './dto/create-survey.dto';
import { CreateSurveyPresignedUploadEntity } from './entity/create-survey.entity';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller({ path: 'survey', version: '1' })
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post('presigned-upload')
    @ApiBody({ 
        type: CreateSurveyPresignedUploadDto,
        examples: { 
            'application/json': { 
                value: { 
                    filename: 'survey-image.jpg',
                    contentType: 'image/jpeg'
                } 
            } 
        } 
    })
    @ApiCreate('Presigned Upload URL', CreateSurveyPresignedUploadEntity)
    async getPresignedUploadUrl(@Body() body: CreateSurveyPresignedUploadDto): Promise<CreateSurveyPresignedUploadEntity> {
        return this.surveyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Survey', [CommonEntity])
    @ApiBody({ type: [CreateSurveyDto] })
    async create(@Body() createSurveyDto: CreateSurveyDto[], @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.create(createSurveyDto, req.user);
    }


    // @Get('all')
    // findAll() {
    //     return this.surveyService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.surveyService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    //     return this.surveyService.update(+id, updateSurveyDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.surveyService.remove(+id);
    // }
}
