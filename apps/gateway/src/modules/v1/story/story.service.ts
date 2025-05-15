import {
    GatewayTimeoutException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, TimeoutError } from 'rxjs';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { MessagePatterns } from '../../../common/constants/message-pattern';

@Injectable()
export class StoryService {
    private readonly logger = new Logger(StoryService.name);

    constructor(@Inject('COMMUNITY_SERVICE') private client: ClientProxy) {
        this.logger.log('StoryService initialized');
    }

    async getAllStories(filters?: FilterStoriesDto) {
        this.logger.log('Getting all stories');
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ALL, filters || {}).pipe(timeout(10000)),
        );
    }

    async getStoryById(id: string) {
        try {
            const response = await firstValueFrom(
                this.client.send(MessagePatterns.Story.V1.FIND_ONE, { id }).pipe(timeout(10000)),
            );

            if (response.status === 'error') {
                // Xatolik bo'lsa, mos HTTP exceptionni tashlang
                const statusCode = response.statusCode || 500;
                if (statusCode === 404) {
                    throw new NotFoundException(response.message);
                } else {
                    throw new HttpException(response.message, statusCode);
                }
            }

            return response.data;
        } catch (error) {
            if (error instanceof TimeoutError) {
                throw new GatewayTimeoutException('Service timeout');
            }
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException(`Failed to get story: ${error.message}`);
        }
    }

    async createStory(createStoryDto: CreateStoryDto, userId: string) {
        this.logger.log('Creating a new story');
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE, { createStoryDto, userId })
                .pipe(timeout(5000)),
        );
    }

    async updateStory(id: string, updateStoryDto: UpdateStoryDto, userId: string) {
        this.logger.log(`Updating story with ID: ${id}`);
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.UPDATE, { id, updateData: updateStoryDto, userId })
                .pipe(timeout(5000)),
        );
    }

    async deleteStory(id: string) {
        this.logger.log(`Deleting story with ID: ${id}`);
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.DELETE, id).pipe(timeout(10000)),
        );
    }

    // Story Item methods
    async createStoryItem(createStoryItemDto: CreateStoryItemDto, userId: string) {
        this.logger.log('Creating story items');
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.CREATE_ITEM, { createStoryItemDto, userId })
                .pipe(timeout(5000)),
        );
    }

    async findStoryItemById(id: string) {
        this.logger.log(`Finding story item with ID: ${id}`);
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.FIND_ONE_ITEM, id).pipe(timeout(10000)),
        );
    }

    async updateStoryItem(id: string, updateStoryItemDto: UpdateStoryItemDto) {
        this.logger.log(`Updating story item with ID: ${id}`);
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Story.V1.UPDATE_ITEM, { id, updateData: updateStoryItemDto })
                .pipe(timeout(5000)),
        );
    }

    async removeStoryItem(id: string) {
        this.logger.log(`Removing story item with ID: ${id}`);
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.DELETE_ITEM, id).pipe(timeout(10000)),
        );
    }
}
