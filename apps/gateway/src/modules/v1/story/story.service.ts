import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { firstValueFrom, timeout } from 'rxjs';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { CreateStoryDto } from './dto/create-story.dto';

@Injectable()
export class StoryService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async createStory(createStoryDto: CreateStoryDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE, { createStoryDto, userId })
                .pipe(timeout(10000)),
        );
    }

    async getStoryById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.FIND_ONE, { id }).pipe(timeout(10000)),
        );
    }

    async updateStory(id: string, updateStoryDto: UpdateStoryDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.UPDATE, { id, updateData: updateStoryDto, userId })
                .pipe(timeout(10000)),
        );
    }

    async deleteStory(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.DELETE, id).pipe(timeout(10000)),
        );
    }

    async getAllStories(filters?: FilterStoriesDto) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.GET_ALL, { filters: filters })
                .pipe(timeout(10000)),
        );
    }

    async createStoryWithFile(serializedData: any, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE_WITH_FILE, { data: serializedData, userId })
                .pipe(timeout(30000)),
        );
    }

    async updateStoryWithFile(id: string, serializedData: any, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.UPDATE_WITH_FILE, {
                    id,
                    data: serializedData,
                    userId,
                })
                .pipe(timeout(30000)),
        );
    }

    async createStoryItem(createStoryItemDto: CreateStoryItemDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE_ITEM, { createStoryItemDto, userId })
                .pipe(timeout(10000)),
        );
    }

    async findStoryItemById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.FIND_ONE_ITEM, id).pipe(timeout(10000)),
        );
    }

    async updateStoryItem(id: string, updateStoryItemDto: UpdateStoryItemDto) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.UPDATE_ITEM, { id, updateData: updateStoryItemDto })
                .pipe(timeout(10000)),
        );
    }

    async removeStoryItem(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.DELETE_ITEM, id).pipe(timeout(10000)),
        );
    }
}
