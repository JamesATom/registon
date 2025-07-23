// student.controller.ts
import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { CustomRequest } from 'src/common/types/types';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { ApiAuth, ApiGetAll } from 'src/common/swagger/common-swagger';
import { StudentService } from './student.service';
import { StudentResponseEntity } from './entity/student-response.entity';
import { ApiQuery } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/libs/common.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller({ path: 'student', version: 'v1' })
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get('all')
    @ApiGetAll('Students', StudentResponseEntity)
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getAll(
        @Req() req: CustomRequest,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<CommonEntity<StudentResponseEntity[]>> {
        return this.studentService.getAll(req.user, limit, page);
    }
}
