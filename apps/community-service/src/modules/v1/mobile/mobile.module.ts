import { Module } from '@nestjs/common';
import { MobileStoryModule } from './story/story.module';
import { SharedModule } from '../../../shared/shared.module';

@Module({
    imports: [SharedModule, MobileStoryModule],
    exports: [MobileStoryModule],
})
export class MobileModule {}
