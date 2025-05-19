import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module';
import { IeltsExamEvents } from './ielts-exam.event';
import { IeltsExamService } from './ielts-exam.service';
import { IeltsExamRepository } from './ielts-exam.repository';

@Module({
    imports: [SharedModule],
    controllers: [IeltsExamEvents],
    providers: [IeltsExamService, IeltsExamEvents, IeltsExamRepository],
    exports: [IeltsExamService],
})
export class IeltsExamModule {}
