import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { MobileStoryService } from './mobile-story.service';
import {
    ApiGetAllMobileStories,
    ApiGetMobileStoryWithItems,
} from './decorators/api-docs.decorators';

@ApiTags('Mobile Stories')
@ApiBearerAuth()
@Controller('mobile/stories')
export class MobileStoryController {
    constructor(private readonly mobileService: MobileStoryService) {}

    @Get()
    @ApiGetAllMobileStories()
    @UseGuards(AuthGuard)
    async getAllStoriesForMobile() {
        return await this.mobileService.getAllStoriesForMobile();
    }

    @Get('/:id')
    @ApiGetMobileStoryWithItems()
    @UseGuards(AuthGuard)
    async getStoryWithItemsById(@Param('id') id: string) {
        return await this.mobileService.getStoryWithItemsById(id);
    }
}
