import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { IeltsExamController } from './ielts-exam.controller';
import { IeltsExamService } from './ielts-exam.service';

@Module({
    imports: [CommunityService],
    controllers: [IeltsExamController],
    providers: [IeltsExamService],
    exports: [],
})
export class IeltsExamModule {}
