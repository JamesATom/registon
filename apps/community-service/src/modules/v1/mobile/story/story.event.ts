import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MobileStoryService } from './story.service';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class MobileStoryEvent {
    constructor(private readonly mobileService: MobileStoryService) {}

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ALL_STORIES)
    async getAllStoriesForMobile(@Payload() data: { userId: string }) {
        return this.mobileService.findAllStoriesForMobile(data.userId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_STORY_WITH_ITEMS)
    async getStoryWithItems(@Payload() data: { id: string; userId: string }) {
        return this.mobileService.findStoryWithItemsById(data.id, data.userId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.TRACK_STORY_ITEMS)
    async trackStoryItems(
        @Payload() data: { storyId: string; storyItemId: string; userId: string },
    ) {
        return this.mobileService.trackStoryItems(data.storyId, data.storyItemId, data.userId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.TRACK_STORY_BUTTON)
    async trackStoryButton(@Payload() data: { storyId: string; userId: string }) {
        return this.mobileService.trackStoryButton(data.storyId, data.userId);
    }
}
