import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { IeltsExamController } from './ielts-exam.controller';
import { IeltsExamService } from './ielts-exam.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Module({
    imports: [CommunityService],
    controllers: [IeltsExamController],
    providers: [IeltsExamService, AuthGuard],
    exports: [],
})
export class IeltsExamModule {}
