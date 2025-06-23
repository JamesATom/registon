// course.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { ExternalService } from '../../external/external.service';
import { RedisService } from '../../redis/redis.service';
import { CourseResponseEntity } from '../entity/course-response.entity';
import { CommonEntity } from 'src/common/libs/common.entity';

@Injectable()
export class CourseService {
    private readonly CACHE_KEY = 'courses';
    private readonly CACHE_TTL = 36000; 

    constructor(
        private readonly redisService: RedisService,
        private readonly externalService: ExternalService,
    ) {}

    async getAll(token: string, limit = 10, page = 1): Promise<CommonEntity<CourseResponseEntity[]>> {
        const cacheKey = `${this.CACHE_KEY}:${limit}:${page}`;
        const cachedData = await this.getCachedCourses(cacheKey);
        
        if (cachedData) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Courses retrieved successfully from cache',
                data: cachedData
            };
        }
        
        const courseData = await this.externalService.getCourseList(token, limit, page);
        if (!courseData || !courseData.data || !courseData.data.data) {
            return {
                statusCode: HttpStatus.OK,
                message: 'No courses found',
                data: {}
            };
        }
        
        await this.cacheCourses(cacheKey, courseData.data.data);
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Courses retrieved successfully',
            data: courseData.data.data
        };
    }
    
    private async getCachedCourses(key: string): Promise<CourseResponseEntity[] | null> {
        const cachedData = await this.redisService.redis.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    
    private async cacheCourses(key: string, data: CourseResponseEntity[]): Promise<void> {
        await this.redisService.redis.set(key, JSON.stringify(data), 'EX', this.CACHE_TTL);
    }
    
    async getOne(token: string, courseId: string): Promise<CommonEntity<CourseResponseEntity>> {
        const cacheKey = `${this.CACHE_KEY}:${courseId}`;
        const cachedData = await this.redisService.redis.get(cacheKey);
        
        if (cachedData) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Course retrieved successfully from cache',
                data: JSON.parse(cachedData)
            };
        }
        
        const courseData = await this.externalService.getCourseById(token, courseId);
        
        if (!courseData || !courseData.data || !courseData.data.course) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Course with ID ${courseId} not found`,
                data: null
            };
        }
        
        await this.redisService.redis.set(cacheKey, JSON.stringify(courseData.data.course), 'EX', this.CACHE_TTL);
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Course retrieved successfully',
            data: courseData.data.course
        };
    }
}