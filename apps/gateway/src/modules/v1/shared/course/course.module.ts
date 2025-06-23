// course.module.ts
import { Global, Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './course.controller';
import { ExternalModule } from '../external/external.module';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
    imports: [ExternalModule, RedisModule],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [CourseService],
})
export class CourseModule {}
