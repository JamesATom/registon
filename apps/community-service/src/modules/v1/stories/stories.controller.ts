import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
import { UpdateStoryItemsDto } from './dto/update-story-items.dto';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateStory,
  ApiFilterStories,
  ApiGetStoryById,
  ApiUpdateStory,
  ApiRemoveStory,
  ApiPublishStory,
  ApiCreateStoryItem,
  ApiGetAllStoryItems,
  ApiGetStoryItemById,
  ApiUpdateStoryItem,
  ApiDeleteStoryItem,
} from './decorators/api-docs.decorators';
import { MessagingService } from '../../messaging/messaging.service';
import { StoryStatus } from '../../shared/models/story.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('stories')
@Controller('api/v1/stories')
@UseGuards(JwtAuthGuard)
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly messagingService: MessagingService,
  ) {}

  @Post()
  @ApiCreateStory()
  async createStory(
    @Body() createStoryDto: CreateStoryDto,
    @Request() req: any,
  ) {
    const result = await this.storiesService.createStory(
      createStoryDto,
      req.user.userId,
    );

    this.messagingService.emit('story.created', result);

    return result;
  }

  @Post('filter')
  @ApiFilterStories()
  async filterStories(@Body() filterDto: FilterStoriesDto) {
    return this.storiesService.findAll(filterDto);
  }

  @Get(':id')
  @ApiGetStoryById()
  findStoryById(@Param('id') id: string) {
    return this.storiesService.findStoryById(id);
  }

  @Patch(':id')
  @ApiUpdateStory()
  async updateStory(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
    @Request() req,
  ) {
    const result = await this.storiesService.updateStory(
      id,
      updateStoryDto,
      req.user.userId,
    );

    this.messagingService.emit('story.updated', { id, ...updateStoryDto });

    return result;
  }

  @Delete(':id')
  @ApiRemoveStory()
  async removeStory(@Param('id') id: string) {
    const result = await this.storiesService.removeStory(id);

    this.messagingService.emit('story.deleted', { id });

    return result;
  }

  @Post('items')
  @ApiCreateStoryItem()
  async createStoryItem(
    @Body() createStoryItemDto: CreateStoryItemDto,
    @Request() req,
  ) {
    const results =
      await this.storiesService.createStoryItem(createStoryItemDto);

    results.forEach((item) => {
      this.messagingService.emit('story.item.created', item);
    });

    return results;
  }

  @Get('items/:id')
  @ApiGetStoryItemById()
  findStoryItemById(@Param('id') id: string) {
    return this.storiesService.findStoryItemById(id);
  }

  @Patch('items/:id')
  @ApiUpdateStoryItem()
  async updateStoryItem(
    @Param('id') id: string,
    @Body() updateStoryItemDto: UpdateStoryItemDto,
  ) {
    const result = await this.storiesService.updateStoryItem(
      id,
      updateStoryItemDto,
    );

    // Notify other services about the updated story item
    this.messagingService.emit('story.item.updated', {
      id,
      ...updateStoryItemDto,
    });

    return result;
  }

  @Delete('items/:id')
  @ApiDeleteStoryItem()
  async removeStoryItem(@Param('id') id: string) {
    try {
      const result = await this.storiesService.removeStoryItem(id);

      // Notify other services about the deleted story item
      this.messagingService.emit('story.item.deleted', {
        id,
        storyId: result.deleted.storyId,
        orderNumber: result.deleted.orderNumber,
        reorderedItems: result.reordered,
      });

      return result;
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error; // Rethrow not found errors
      }
      throw new InternalServerErrorException(
        `Failed to delete story item: ${error.message || 'Unknown error'}`,
      );
    }
  }
}
