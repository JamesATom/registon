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
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
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

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller('stories')
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

    @Put(':id')
    @ApiUpdateStory()
    @ApiBody({ type: UpdateStoryDto })
    async updateStory(
        @Param('id') id: string,
        @Body() updateStoryDto: UpdateStoryDto,
        @Request() req: any,
    ) {
        return this.storyService.updateStory(id, updateStoryDto, req.user?.userId);
    }

    @Delete(':id')
    @ApiRemoveStory()
    async removeStory(@Param('id') id: string) {
        return this.storyService.deleteStory(id);
    }

    @Post('filter')
    @ApiFilterStories()
    async filterStories(@Body() filterDto: FilterStoriesDto) {
        return this.storyService.getAllStories(filterDto);
    }

    @Post('items')
    @ApiCreateStoryItem()
    @ApiBody({ type: CreateStoryItemDto })
    async createStoryItem(@Body() createStoryItemDto: CreateStoryItemDto, @Request() req: any) {
        return this.storyService.createStoryItem(createStoryItemDto, req.user?.userId);
    }

    @Get('items/:id')
    @ApiGetStoryItemById()
    async findStoryItemById(@Param('id') id: string) {
        return this.storyService.findStoryItemById(id);
    }

    @Put('items/:id')
    @ApiUpdateStoryItem()
    @ApiBody({ type: UpdateStoryItemDto })
    async updateStoryItem(@Param('id') id: string, @Body() updateStoryItemDto: UpdateStoryItemDto) {
        return this.storyService.updateStoryItem(id, updateStoryItemDto);
    }

    @Delete('items/:id')
    @ApiDeleteStoryItem()
    async removeStoryItem(@Param('id') id: string) {
        return this.storyService.removeStoryItem(id);
    }
}
