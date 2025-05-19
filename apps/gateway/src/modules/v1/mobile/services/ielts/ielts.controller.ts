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
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { IeltsExamService } from './ielts.service';
import { CreateIeltsExamDto } from './dto/create-ielts-exam.dto';
import { UpdateIeltsExamDto } from './dto/update-ielts-exam.dto';
import { FilterIeltsExamsDto } from './dto/filter-ielts-registrations.dto';
import {
    ApiCreateIeltsExam,
    ApiGetAllIeltsExams,
    ApiGetIeltsExamById,
    ApiUpdateIeltsExam,
    ApiDeleteIeltsExam,
} from './decorators/api-docs.decorators';

@ApiTags('IELTS Exams')
@ApiBearerAuth()
@Controller('services/ielts')
export class IeltsExamController {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @Post('exams')
    @UseGuards(AuthGuard)
    @ApiCreateIeltsExam()
    async createExam(@Body() createExamDto: CreateIeltsExamDto, @Req() req: any) {
        return this.ieltsExamService.createExam(createExamDto, req.user.userId);
    }

    @Get('exams')
    @ApiGetAllIeltsExams()
    async getAllExams(@Query() filterDto: FilterIeltsExamsDto) {
        return this.ieltsExamService.getAllExams(filterDto);
    }

    @Get('exams/:id')
    @ApiGetIeltsExamById()
    async findExamById(@Param('id') id: string) {
        return this.ieltsExamService.findExamById(id);
    }

    @Patch('exams/:id')
    @UseGuards(AuthGuard)
    @ApiUpdateIeltsExam()
    async updateExam(
        @Param('id') id: string,
        @Body() updateExamDto: UpdateIeltsExamDto,
        @Req() req: any,
    ) {
        return this.ieltsExamService.updateExam(id, updateExamDto, req.user.userId);
    }

    @Delete('exams/:id')
    @UseGuards(AuthGuard)
    @ApiDeleteIeltsExam()
    async deleteExam(@Param('id') id: string, @Req() req: any) {
        return this.ieltsExamService.deleteExam(id, req.user.userId);
    }
}
