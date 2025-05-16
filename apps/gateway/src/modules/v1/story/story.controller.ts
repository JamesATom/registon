import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Request,
    Req,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { StoryService } from './story.service';
import { FastifyRequest } from 'fastify';
import { FileSerializer } from '../../../common/utils/file-serializer';
import { FilterStoriesDto } from './dto/filter-stories.dto';
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

@ApiTags('stories')
@ApiBearerAuth()
@Controller('stories')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Post()
    @ApiCreateStory()
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    async createStory(@Req() request: FastifyRequest, @Request() req: any) {
        const data = await (request as any).file();
        const serializedData = await FileSerializer.serializeMultipartData(data);
        return this.storyService.createStoryWithFile(serializedData, req.user?.userId);
    }

    @Get(':id')
    @ApiGetStoryById()
    @UseGuards(AuthGuard)
    async findStoryById(@Param('id') id: string) {
        return this.storyService.getStoryById(id);
    }

    @Put(':id')
    @ApiUpdateStory()
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    async updateStory(
        @Param('id') id: string,
        @Req() request: FastifyRequest,
        @Request() req: any,
    ) {
        const data = await (request as any).file();
        if (data) {
            const serializedData = await FileSerializer.serializeMultipartData(data);
            return this.storyService.updateStoryWithFile(id, serializedData, req.user?.userId);
        }
        const body = await request.body;
        return this.storyService.updateStory(id, body, req.user?.userId);
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
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    async createStoryItem(@Req() request: FastifyRequest, @Request() req: any) {
        const data = await (request as any).file();
        const serializedData = await FileSerializer.serializeMultipartData(data);
        return this.storyService.createStoryItemWithFile(serializedData, req.user?.userId);
    }

    @Get('items/:id')
    @ApiGetStoryItemById()
    @UseGuards(AuthGuard)
    async findStoryItemById(@Param('id') id: string) {
        return this.storyService.findStoryItemById(id);
    }

    @Put('items/:id')
    @ApiUpdateStoryItem()
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    async updateStoryItem(@Param('id') id: string, @Req() request: FastifyRequest) {
        const data = await (request as any).file();
        if (!data) {
            throw new BadRequestException('No form data received');
        }

        const serializedData = await FileSerializer.serializeMultipartData(data);
        return this.storyService.updateStoryItemWithFile(id, serializedData);
    }

    @Delete('items/:id')
    @ApiDeleteStoryItem()
    @UseGuards(AuthGuard)
    async removeStoryItem(@Param('id') id: string) {
        return this.storyService.removeStoryItem(id);
    }
}
