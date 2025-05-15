import {
    Controller,
    Get,
    Param,
    UseGuards,
    Logger,
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
    private readonly logger = new Logger(MobileStoryController.name);

    constructor(private readonly mobileService: MobileStoryService) {
        this.logger.log('MobileStoryController initialized');
    }

    @Get('stories')
    @ApiGetAllMobileStories()
    @UseGuards(AuthGuard)
    async getAllStoriesForMobile() {
        this.logger.log('GET /api/v1/mobile/stories - Get all stories for mobile');
        try {
            return await this.mobileService.getAllStoriesForMobile();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to get mobile stories: ${errorMessage}`, error);
            throw new BadRequestException(`Failed to get mobile stories: ${errorMessage}`);
        }
    }

    @Get('stories/:id')
    @ApiGetMobileStoryWithItems()
    @UseGuards(AuthGuard)
    async getStoryWithItemsById(@Param('id') id: string) {
        this.logger.log(`GET /api/v1/mobile/stories/${id} - Get story with items for mobile`);
        try {
            return await this.mobileService.getStoryWithItemsById(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to get mobile story with items: ${errorMessage}`, error);

            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to get story with items: ${errorMessage}`);
        }
    }
}
