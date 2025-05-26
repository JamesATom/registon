// mobile.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices/community.service';
import { StoryModule } from './story/story.module';
import { IeltsExamModule } from './ielts/ielts-exam.module';
import { UniversityModule } from './university/university.module';

@Module({
    imports: [CommunityService, StoryModule, IeltsExamModule, UniversityModule],
    controllers: [],
    providers: [],
})
export class MobileModule {}
