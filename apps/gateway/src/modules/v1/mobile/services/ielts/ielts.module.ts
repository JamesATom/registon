import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { IeltsExamController } from './ielts.controller';
import { IeltsExamService } from './ielts.service';
import { AuthGuard } from '../../../auth/guards/auth.guard';

@Module({
    imports: [CommunityService],
    controllers: [IeltsExamController],
    providers: [IeltsExamService, AuthGuard],
    exports: [],
})
export class IeltsModule {}
