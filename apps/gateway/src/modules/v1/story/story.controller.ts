import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { StoryService } from './story.service';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
import {
    ApiCreateStory,
    ApiFilterStories,
    ApiGetStoryById,
    ApiUpdateStory,
    ApiRemoveStory,
    ApiCreateStoryItem,
    ApiGetStoryItemById,
    ApiUpdateStoryItem,
    ApiDeleteStoryItem,
} from './decorators/api-docs.decorators';

@ApiTags('Stories')
@ApiBearerAuth()
@Controller('stories')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Post()
    @ApiCreateStory()
    @ApiBody({ type: CreateStoryDto })
    @UseGuards(AuthGuard)
    async createStory(@Body() createStoryDto: CreateStoryDto, @Request() req: any) {
        return this.storyService.createStory(createStoryDto, req.user?.userId);
    }

    @Get(':id')
    @ApiGetStoryById()
    @UseGuards(AuthGuard)
    async findStoryById(@Param('id') id: string) {
        return this.storyService.getStoryById(id);
    }

    @Put(':id')
    @ApiUpdateStory()
    @ApiBody({ type: UpdateStoryDto })
    @UseGuards(AuthGuard)
    async updateStory(
        @Param('id') id: string,
        @Body() updateStoryDto: UpdateStoryDto,
        @Request() req: any,
    ) {
        return this.storyService.updateStory(id, updateStoryDto, req.user?.userId);
    }

    @Delete(':id')
    @ApiRemoveStory()
    @UseGuards(AuthGuard)
    async removeStory(@Param('id') id: string) {
        return this.storyService.deleteStory(id);
    }

    @Post('filter')
    @ApiFilterStories()
    @UseGuards(AuthGuard)
    async filterStories(@Body() filterDto: FilterStoriesDto) {
        return this.storyService.getAllStories(filterDto);
    }

    @Post('items')
    @ApiCreateStoryItem()
    @ApiBody({ type: CreateStoryItemDto })
    @UseGuards(AuthGuard)
    async createStoryItem(@Body() createStoryItemDto: CreateStoryItemDto, @Request() req: any) {
        return this.storyService.createStoryItem(createStoryItemDto, req.user?.userId);
    }

    @Get('items/:id')
    @ApiGetStoryItemById()
    @UseGuards(AuthGuard)
    async findStoryItemById(@Param('id') id: string) {
        return this.storyService.findStoryItemById(id);
    }

    @Put('items/:id')
    @ApiUpdateStoryItem()
    @ApiBody({ type: UpdateStoryItemDto })
    @UseGuards(AuthGuard)
    async updateStoryItem(@Param('id') id: string, @Body() updateStoryItemDto: UpdateStoryItemDto) {
        return this.storyService.updateStoryItem(id, updateStoryItemDto);
    }

    @Delete('items/:id')
    @ApiDeleteStoryItem()
    @UseGuards(AuthGuard)
    async removeStoryItem(@Param('id') id: string) {
        return this.storyService.removeStoryItem(id);
    }
}
