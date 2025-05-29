import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
    ApiAuth,
    ApiGetAll,
    ApiGetOne,
    ApiCreate,
    ApiUpdate,
    ApiDelete,
} from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
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

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller('services/ielts/exams')
export class IeltsExamController {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @Post()
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

    @Put(':id')
    @ApiUpdateIeltsExam()
    async updateExam(
        @Param('id') id: string,
        @Body() updateExamDto: UpdateIeltsExamDto,
        @Req() req: any,
    ) {
        return this.ieltsExamService.updateExam(id, updateExamDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDeleteIeltsExam()
    async deleteExam(@Param('id') id: string, @Req() req: any) {
        return this.ieltsExamService.deleteExam(id, req.user.userId);
    }
}
