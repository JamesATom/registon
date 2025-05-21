import { Module } from '@nestjs/common';
import { MobileStoryModule } from './story/story.module';
import { SharedModule } from '../../../shared/shared.module';
import { MobileIeltsExamModule } from './ielts-exam/ielts-exam.module';

@Module({
    imports: [SharedModule, MobileStoryModule, MobileIeltsExamModule],
    exports: [MobileStoryModule, MobileIeltsExamModule],
})
export class MobileModule {}
