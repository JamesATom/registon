import { Controller, Get, Post, Param, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { ApiAuth } from 'src/common/swagger/common-swagger';
import { StoryService } from './story.service';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import {
    ApiCreateStory,
    ApiFilterStories,
    ApiGetStoryById,
    ApiCreateStoryItem,
    ApiGetStoryItemById,
} from './decorators/api-docs.decorators';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - Story')
@Controller('mobile/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Post()
    @ApiCreateStory()
    @ApiBody({ type: CreateStoryDto })
    async createStory(@Body() createStoryDto: CreateStoryDto, @Request() req: any) {
        return this.storyService.createStory(createStoryDto, req.user?.userId);
    }

    @Get(':id')
    @ApiGetStoryById()
    async findStoryById(@Param('id') id: string) {
        return this.storyService.getStoryById(id);
    }

    @Post('filter')
    @ApiFilterStories()
    async filterStories(@Body() filterDto: FilterStoriesDto) {
        return this.storyService.getAllStories(filterDto);
    }

    @Post('item')
    @ApiCreateStoryItem()
    @ApiBody({ type: CreateStoryItemDto })
    async createStoryItem(@Body() createStoryItemDto: CreateStoryItemDto, @Request() req: any) {
        return this.storyService.createStoryItem(createStoryItemDto, req.user?.userId);
    }

    @Get('item/:id')
    @ApiGetStoryItemById()
    async findStoryItemById(@Param('id') id: string) {
        return this.storyService.findStoryItemById(id);
    }
}
