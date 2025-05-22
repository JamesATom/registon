import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MessagePatterns } from '../../../../common/constants/message-pattern';

@Injectable()
export class StoryService {
    constructor(@Inject('COMMUNITY_SERVICE') private client: ClientProxy) {}

    async getAllStoriesForMobile(userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ALL_STORIES, { userId })
                .pipe(timeout(10000)),
        );
    }

    async getStoryWithItemsById(id: string, userId: string) {
        return await firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_STORY_WITH_ITEMS, { id, userId })
                .pipe(timeout(10000)),
        );
    }

    async trackStoryItems(storyId: string, storyItemId: string, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.TRACK_STORY_ITEMS, {
                    storyId,
                    storyItemId,
                    userId,
                })
                .pipe(timeout(10000)),
        );
    }

    async trackStoryButton(storyId: string, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.TRACK_STORY_BUTTON, { storyId, userId })
                .pipe(timeout(10000)),
        );
    }
}
