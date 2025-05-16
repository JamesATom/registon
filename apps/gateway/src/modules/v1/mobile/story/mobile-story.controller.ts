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

@ApiTags('mobile')
@ApiBearerAuth()
@Controller('mobile')
export class MobileStoryController {
    constructor(private readonly mobileService: MobileStoryService) {}

    @Get('stories')
    @ApiGetAllMobileStories()
    @UseGuards(AuthGuard)
    async getAllStoriesForMobile() {
        try {
            return await this.mobileService.getAllStoriesForMobile();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(`Failed to get mobile stories: ${errorMessage}`);
        }
    }

    @Get('stories/:id')
    @ApiGetMobileStoryWithItems()
    @UseGuards(AuthGuard)
    async getStoryWithItemsById(@Param('id') id: string) {
        try {
            return await this.mobileService.getStoryWithItemsById(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to get story with items: ${errorMessage}`);
        }
    }
}
