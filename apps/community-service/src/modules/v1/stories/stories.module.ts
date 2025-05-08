import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { SharedModule } from '../../shared/shared.module';
import { MessagingModule } from '../../messaging/messaging.module';
import { StoriesMessageHandler } from './stories.message-handler';

@Module({
  imports: [
    SharedModule,
    MessagingModule,
  ],
  controllers: [StoriesController, StoriesMessageHandler],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
