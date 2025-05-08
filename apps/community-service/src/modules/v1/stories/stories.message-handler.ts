import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
import { StoryStatus } from '../../shared/models/story.schema';
import { Types } from 'mongoose';

/**
 * This class handles incoming messages from RabbitMQ for Story operations
 * Allows other microservices to interact with Stories via messaging
 */
@Controller()
export class StoriesMessageHandler {
  // Default system user ID for messages from other services
  private readonly systemUserId = '000000000000000000000000';
  constructor(private readonly storiesService: StoriesService) {}

  // Story message patterns
  @MessagePattern('stories.find.all')
  async findAllStories(@Payload() status?: StoryStatus) {
    return this.storiesService.findAllStories(status);
  }

  @MessagePattern('stories.find.one')
  async findStoryById(@Payload() id: string) {
    return this.storiesService.findStoryById(id);
  }

  @MessagePattern('stories.create')
  async createStory(@Payload() createStoryDto: CreateStoryDto) {
    return this.storiesService.createStory(createStoryDto, this.systemUserId);
  }

  @MessagePattern('stories.update')
  async updateStory(
    @Payload() payload: { id: string; updateData: UpdateStoryDto },
  ) {
    return this.storiesService.updateStory(
      payload.id,
      payload.updateData,
      this.systemUserId,
    );
  }

  @MessagePattern('stories.delete')
  async removeStory(@Payload() id: string) {
    return this.storiesService.removeStory(id);
  }

  // Publish story functionality has been removed
  // @MessagePattern('stories.publish')
  // async publishStory(@Payload() id: string) {
  //   return this.storiesService.publishStory(id);
  // }

  @MessagePattern('stories.items.find.one')
  async findStoryItemById(@Payload() id: string) {
    return this.storiesService.findStoryItemById(id);
  }

  @MessagePattern('stories.items.create')
  async createStoryItem(@Payload() createStoryItemDto: CreateStoryItemDto) {
    return this.storiesService.createStoryItem(createStoryItemDto);
  }

  @MessagePattern('stories.items.update')
  async updateStoryItem(
    @Payload() payload: { id: string; updateData: UpdateStoryItemDto },
  ) {
    return this.storiesService.updateStoryItem(payload.id, payload.updateData);
  }

  @MessagePattern('stories.items.delete')
  async removeStoryItem(@Payload() id: string) {
    return this.storiesService.removeStoryItem(id);
  }
}
