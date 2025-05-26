import { Module } from '@nestjs/common';
import { MobileStoryModule } from './story/story.module';
import { SharedModule } from '../../../shared/shared.module';
import { MobileIeltsExamModule } from './ielts-exam/ielts-exam.module';
import { MobileUniversityModule } from './university/university.module';

@Module({
    imports: [SharedModule, MobileStoryModule, MobileIeltsExamModule, MobileUniversityModule],
    exports: [MobileStoryModule, MobileIeltsExamModule, MobileUniversityModule],
})
export class MobileModule {}
