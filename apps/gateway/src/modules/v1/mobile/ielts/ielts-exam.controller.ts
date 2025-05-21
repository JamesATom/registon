import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Param,
    Body,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { IeltsExamService } from './ielts-exam.service';
import { ApiGetIeltsExamById } from './decorators/api-docs.decorators';

@ApiTags('IELTS Exams')
@ApiBearerAuth()
@Controller('mobile/services/ielts/')
export class IeltsExamController {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @Get('exams')
    @UseGuards(AuthGuard)
    //@ApiGetAllIeltsExams()
    async getAllIeltsExamDays(@Query('location') location: string) {
        return this.ieltsExamService.getAllIeltsExamDays(location);
    }

    @Get('exams/:id')
    @ApiGetIeltsExamById()
    async findExamById(@Param('id') id: string) {
        return this.ieltsExamService.findExamById(id);
    }
}
