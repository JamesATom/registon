// story.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { StoryRepository } from '../repository/story.repository';
import { CreateStoryDto } from '../dto/create-story.dto';
import { FilterStoryDto } from '../dto/filter-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';

@Injectable()
export class StoryService {
    constructor(private readonly storyRepository: StoryRepository) {}

    async create(createStoryDto: CreateStoryDto): Promise<CommonEntity> {
        const createdStory = await this.storyRepository.create(createStoryDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Story created successfully',
            data: createdStory,
        };
    }

    async getAll(filter: FilterStoryDto): Promise<CommonEntity> {
        const stories = await this.storyRepository.getAll();

        return {
            statusCode: HttpStatus.OK,
            message: 'Stories retrieved successfully',
            data: stories,
        };
    }

    async getOne(id: string): Promise<CommonEntity> {
        const story = await this.storyRepository.getOne(id);

        return {
            statusCode: HttpStatus.OK,
            message: 'Story retrieved successfully',
            data: story || {},
        };
    }

    async update(id: string, updateStoryDto: UpdateStoryDto): Promise<CommonEntity> {
        const updatedStory = await this.storyRepository.update(id, updateStoryDto);

        return {
            statusCode: HttpStatus.OK,
            message: 'Story updated successfully',
            data: updatedStory,
        };
    }

    async delete(id: string): Promise<CommonEntity> {
        const story = await this.storyRepository.getOne(id);
        if (!story) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Story with ID ${id} not found`,
                data: {},
            };
        }

        await this.storyRepository.delete(id);

        return {
            statusCode: HttpStatus.OK,
            message: 'Story deleted successfully',
            data: {},
        };
    }
}
