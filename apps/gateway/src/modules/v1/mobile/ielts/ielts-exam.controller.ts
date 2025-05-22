import { Controller, Get, Post, Param, Body, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { IeltsExamService } from './ielts-exam.service';
import { ApiGetIeltsExamById, ApiGetRegistredExams } from './decorators/api-docs.decorators';
import { ApiGetAllIeltsExams } from './decorators/api-docs.decorators';
import { CreateIeltsRegistrationDto } from './dto/create-ielts-exam.dto';
import { ApiCreateIeltsRegistration } from './decorators/api-docs.decorators';

@ApiTags('IELTS Exams')
@ApiBearerAuth()
@Controller('mobile/services/ielts/')
export class IeltsExamController {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @Get('exams')
    @UseGuards(AuthGuard)
    @ApiGetAllIeltsExams()
    async getAllIeltsExamDays(@Query('city') city: string, @Query('examType') examType: string) {
        return this.ieltsExamService.getAllIeltsExamDays(city, examType);
    }

    @Get('exams/:id')
    @ApiGetIeltsExamById()
    async findExamById(@Param('id') id: string) {
        return this.ieltsExamService.findExamById(id);
    }

    @Post('exams/register')
    @ApiCreateIeltsRegistration()
    @UseGuards(AuthGuard)
    async registerForExam(@Body() body: CreateIeltsRegistrationDto, @Req() req: any) {
        return this.ieltsExamService.registerForExam(body, req.user.userId);
    }

    @Get('exams/registrations')
    @ApiGetRegistredExams()
    @UseGuards(AuthGuard)
    async getRegistredExams(@Query('examType') examType: string, @Req() req: any) {
        return this.ieltsExamService.getRegistredExams(req.user.userId, examType);
    }
}
