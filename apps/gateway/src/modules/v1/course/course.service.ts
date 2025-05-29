// course.service.ts
import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

    constructor(private readonly externalService: ExternalService) {}

    async getAll() {
        return this.externalService.getCourseList('hi');
    }
}
