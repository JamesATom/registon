// course-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ExternalService } from 'src/modules/v1/shared/external/external.service';

@Injectable()
export class CourseValidationPipe implements PipeTransform {
    constructor(private readonly externalService: ExternalService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        if (!value || !value.course || !Array.isArray(value.course) || value.course.length === 0) {
            return value;
        }

        const coursesResponse = await this.externalService.getCourseList();
        if (!coursesResponse?.data || !Array.isArray(coursesResponse.data.data)) {
            throw new HttpException(
                'Failed to fetch course list',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        
        const validCourseIds = coursesResponse.data.data.map(course => course._id);
        const invalidCourseIds = value.course.filter(courseId => !validCourseIds.includes(courseId));

        if (invalidCourseIds.length > 0) {
            throw new HttpException(
                `The following course IDs are invalid: ${invalidCourseIds.join(', ')}`,
                HttpStatus.BAD_REQUEST
            );
        }

        return value;
    }
}
