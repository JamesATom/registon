// shared.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { BranchModule } from './branch/branch.module';
import { CityModule } from './city/city.module';
import { ExternalModule } from './external/external.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';

@Module({
    imports: [
        AuthModule,
        RedisModule,
        BranchModule,
        CityModule,
        ExternalModule,
        CourseModule,
    ],
    exports: [
        AuthModule,
        RedisModule,
        BranchModule,
        CityModule,
        ExternalModule,
        CourseModule,
    ],
})
export class SharedModule {}
