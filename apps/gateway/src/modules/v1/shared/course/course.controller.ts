// course.controller.ts
import { Controller, Get, Query, UseGuards, Req, Param } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CourseService } from './service/course.service';
import { CourseResponseEntity } from './entity/course-response.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiGetAll, ApiGetOne } from 'src/common/swagger/common-swagger';
import { CommonEntity } from 'src/common/libs/common.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Course')
@Controller({ path: 'course', version: '1' })
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get('all')
    @ApiGetAll('Course', CourseResponseEntity)
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of courses to return' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    async getAllCourses(
        @Req() req: CustomRequest,
        @Query('limit') limit?: number,
        @Query('page') page?: number,
    ): Promise<CommonEntity<CourseResponseEntity[]>> {
        const token = req.user?.userData?.token || '';
        console.log('Token here in course controller:', token);
        return this.courseService.getAll(token, limit || 10, page || 1);
    }

    @Get(':id')
    @ApiGetOne('Course')
    async getOneCourse(
        @Req() req: CustomRequest,
        @Param('id') id: string,
    ): Promise<CommonEntity<CourseResponseEntity>> {
        const token = req.user?.userData?.token || '';
        return this.courseService.getOne(token, id);
    }
}
