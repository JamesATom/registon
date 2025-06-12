import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { firstValueFrom } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { CreateStoryDto } from './dto/create-story.dto';

@Injectable()
export class StoryService {
    private REQUEST_TIMEOUT = 10000; // 10 seconds timeout

    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async createStory(createStoryDto: CreateStoryDto, userId: string) {
        // Always set status to PUBLISHED for mobile
        const updatedDto = { 
            ...createStoryDto, 
            status: 'PUBLISHED' 
        };
        
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.CREATE, { createStoryDto: updatedDto, userId }).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            ),
        );
    }

    async getStoryById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ONE, { id }).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            ),
        );
    }

    async getAllStories(filters?: FilterStoriesDto) {
        // Always filter for published stories on mobile
        const updatedFilters = { 
            ...filters, 
            status: 'PUBLISHED' 
        };
        
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ALL, { filters: updatedFilters }).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            ),
        );
    }

    async createStoryWithFile(serializedData: any, userId: string) {
        // Ensure status is set to PUBLISHED
        if (serializedData && serializedData.fields) {
            serializedData.fields.status = 'PUBLISHED';
        }
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE_WITH_FILE, { data: serializedData, userId })
                .pipe(
                    timeout(30000),
                    catchError((error) => {
                        throw error;
                    })
                ),
        );
    }

    async createStoryItem(createStoryItemDto: CreateStoryItemDto, userId: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.CREATE_ITEM, { createStoryItemDto, userId }).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            ),
        );
    }

    async findStoryItemById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ONE_ITEM, id).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            ),
        );
    }
}
