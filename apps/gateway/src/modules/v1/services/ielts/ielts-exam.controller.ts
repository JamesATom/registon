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
@Controller('services/ielts/exams')
export class IeltsExamController {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiCreateIeltsExam()
    async createExam(@Body() createExamDto: CreateIeltsExamDto, @Req() req: any) {
        return this.ieltsExamService.createExam(createExamDto, req.user.userId);
    }

    @Get()
    @ApiGetAllIeltsExams()
    async getAllExams(@Query() filterDto: FilterIeltsExamsDto) {
        return this.ieltsExamService.getAllExams(filterDto);
    }

    @Get(':id')
    @ApiGetIeltsExamById()
    async findExamById(@Param('id') id: string) {
        return this.ieltsExamService.findExamById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiUpdateIeltsExam()
    async updateExam(
        @Param('id') id: string,
        @Body() updateExamDto: UpdateIeltsExamDto,
        @Req() req: any,
    ) {
        return this.ieltsExamService.updateExam(id, updateExamDto, req.user.userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiDeleteIeltsExam()
    async deleteExam(@Param('id') id: string, @Req() req: any) {
        return this.ieltsExamService.deleteExam(id, req.user.userId);
    }
}
