// student.module.ts
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ExternalModule } from '../external/external.module';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [ExternalModule, RedisModule],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService],
})
export class StudentModule {}
