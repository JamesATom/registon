import { Module } from '@nestjs/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MobileIeltsExamEvent } from './ielts-exam.event';
import { MobileIeltsExamRepository } from './ielts-exam.repository';
import { MobileIeltsExamService } from './ielts-exam.service';

@Module({
    imports: [SharedModule],
    controllers: [MobileIeltsExamEvent],
    providers: [MobileIeltsExamService, MobileIeltsExamRepository],
})
export class MobileIeltsExamModule {}
