import {
    Controller,
    Get,
    Param,
    UseGuards,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { MobileStoryService } from './mobile-story.service';
import {
    ApiGetAllMobileStories,
    ApiGetMobileStoryWithItems,
} from './decorators/api-docs.decorators';

@ApiTags('Mobile')
@ApiBearerAuth()
@Controller('mobile')
export class MobileStoryController {
    constructor(private readonly mobileService: MobileStoryService) {}

    @Get('stories')
    @ApiGetAllMobileStories()
    @UseGuards(AuthGuard)
    async getAllStoriesForMobile() {
        return await this.mobileService.getAllStoriesForMobile();
    }

    @Get('stories/:id')
    @ApiGetMobileStoryWithItems()
    @UseGuards(AuthGuard)
    async getStoryWithItemsById(@Param('id') id: string) {
        return await this.mobileService.getStoryWithItemsById(id);
    }
}
