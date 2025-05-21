import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { StoryService } from './story.service';
import {
    ApiGetAllMobileStories,
    ApiGetMobileStoryWithItems,
    ApiTrackStoryButton,
    ApiTrackStoryItems,
} from './decorators/api-docs.decorators';
import { TrackStoryButtonDto, TrackStoryItemsDto } from './dto/dto';

@ApiTags('Mobile Stories')
@ApiBearerAuth()
@Controller('mobile/stories')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Get()
    @ApiGetAllMobileStories()
    @UseGuards(AuthGuard)
    async getAllStoriesForMobile(@Req() req: any) {
        console.log('req.user.userId', req.user.userId);
        return await this.storyService.getAllStoriesForMobile(req.user.userId);
    }

    @Get('/:id')
    @ApiGetMobileStoryWithItems()
    @UseGuards(AuthGuard)
    async getStoryWithItemsById(@Param('id') id: string, @Req() req: any) {
        return await this.storyService.getStoryWithItemsById(id, req.user.userId);
    }

    @Post('/track/items')
    @ApiTrackStoryItems()
    @UseGuards(AuthGuard)
    async trackStoryItems(@Body() trackStoryItemsDto: TrackStoryItemsDto, @Req() req: any) {
        return await this.storyService.trackStoryItems(
            trackStoryItemsDto.storyId,
            trackStoryItemsDto.storyItemId,
            req.user.userId,
        );
    }

    @Post('/track/button')
    @ApiTrackStoryButton()
    @UseGuards(AuthGuard)
    async trackStoryButton(@Body() trackStoryButtonDto: TrackStoryButtonDto, @Req() req: any) {
        return await this.storyService.trackStoryButton(
            trackStoryButtonDto.storyId,
            req.user.userId,
        );
    }
}
