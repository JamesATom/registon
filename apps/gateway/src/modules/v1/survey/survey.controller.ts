// survey.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

class PresignedUploadRequestDto {
    filename: string;
    contentType: string;
}

class PresignedUploadResponseDto {
    uploadUrl: string;
    fileKey: string;
    publicUrl: string;
}

@Controller('survey')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post()
    create(@Body() createSurveyDto: CreateSurveyDto) {
        return this.surveyService.create(createSurveyDto);
    }

    @Post('presigned-upload')
    @ApiOperation({ summary: 'Get a presigned URL for uploading a survey image' })
    @ApiBody({ 
        type: PresignedUploadRequestDto,
        examples: { 
            'application/json': { 
                value: { 
                    filename: 'survey-image.jpg',
                    contentType: 'image/jpeg'
                } 
            } 
        } 
    })
    @ApiOkResponse({
        description: 'Presigned upload URL and related info',
        type: PresignedUploadResponseDto,
        schema: {
            example: {
                uploadUrl: 'https://your-space-url/...',
                fileKey: 'survey/uuid-filename.jpg',
                publicUrl: 'https://your-space-url/survey/uuid-filename.jpg'
            }
        }
    })
    async getPresignedUploadUrl(@Body() body: PresignedUploadRequestDto) {
        return this.surveyService.generatePresignedUploadUrl(body.filename, body.contentType);
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
