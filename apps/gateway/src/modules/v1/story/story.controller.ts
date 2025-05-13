import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Logger,
    Request,
    BadRequestException,
    NotFoundException,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { StoryService } from './story.service';
import { FileService } from '../../../file/file.service';
import { FastifyRequest } from 'fastify';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CreateStoryItemDto } from './dto/create-story-item.dto';
import { UpdateStoryItemDto } from './dto/update-story-item.dto';
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
@Controller('api/v1/stories')
export class StoryController {
    private readonly logger = new Logger(StoryController.name);

    constructor(
        private readonly storyService: StoryService,
        private readonly fileService: FileService,
    ) {
        this.logger.log('StoryController initialized');
    }

    @Post('filter')
    @ApiFilterStories()
    async filterStories(@Body() filterDto: FilterStoriesDto) {
        this.logger.log('POST /api/v1/stories/filter - Filter stories');
        return this.storyService.getAllStories(filterDto);
    }

    @Get(':id')
    @ApiGetStoryById()
    async findStoryById(@Param('id') id: string) {
        this.logger.log(`GET /api/v1/stories/${id} - Get story by ID`);
        return this.storyService.getStoryById(id);
    }

    @Post()
    @ApiCreateStory()
    @ApiConsumes('multipart/form-data')
    async createStory(@Req() request: FastifyRequest, @Request() req: any) {
        this.logger.log('POST /api/v1/stories - Create new story');
        try {
            const data = await (request as any).file();
            if (!data) {
                throw new BadRequestException('Main image file is required');
            }

            // Extract form fields
            const fields = data.fields || {};
            const title = fields.title?.value;
            const description = fields.description?.value;
            const status = fields.status?.value;
            const link = fields.link?.value;
            const buttonText = fields.buttonText?.value;
            const startDate = fields.startDate?.value
                ? new Date(fields.startDate.value)
                : undefined;
            const endDate = fields.endDate?.value ? new Date(fields.endDate.value) : undefined;
            const commentAdmin = fields.commentAdmin?.value;

            // Handle branches array
            let branches: string[] = [];
            if (fields.branches?.value) {
                try {
                    // Check if it's a JSON array
                    branches = JSON.parse(fields.branches.value);
                } catch (e) {
                    // If not JSON, treat as a comma-separated string
                    branches = fields.branches.value.split(',').map(branch => branch.trim());
                }
            }

            if (!title || !branches || branches.length === 0) {
                throw new BadRequestException('Title and at least one branch are required');
            }

            // Convert file to buffer
            const buffer = await data.toBuffer();

            // Create a file object
            const file = {
                fieldname: data.fieldname,
                originalname: data.filename,
                encoding: data.encoding,
                mimetype: data.mimetype,
                size: buffer.length,
                buffer: buffer,
            };

            // Upload file to storage via FileService
            const uploadResult = await this.fileService.uploadFile(file, {
                folder: 'stories',
                filename: data.filename,
            });

            // Create story DTO with the uploaded image
            const createStoryDto: CreateStoryDto = {
                title,
                description,
                status: status || 'draft',
                mainImage: uploadResult.url, // Use the URL returned from file upload
                link,
                buttonText,
                startDate,
                endDate,
                commentAdmin,
                branches,
                createdBy: '', // Will be set by the service
                updatedBy: '', // Will be set by the service
            };

            // Create the story
            const result = await this.storyService.createStory(
                createStoryDto,
                req.user?.userId || '000000000000000000000000',
            );
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to create story: ${errorMessage}`, error);
            throw new BadRequestException(`Failed to create story: ${errorMessage}`);
        }
    }

    @Put(':id')
    @ApiUpdateStory()
    @ApiConsumes('multipart/form-data')
    async updateStory(
        @Param('id') id: string,
        @Req() request: FastifyRequest,
        @Request() req: any,
    ) {
        this.logger.log(`PUT /api/v1/stories/${id} - Update story`);
        try {
            // Process multipart form data
            let updateStoryDto: any = {};
            let fileUploaded = false;
            console.log('req.body', request.body);
            try {
                const data = await (request as any).file();
                if (data) {
                    fileUploaded = true;
                    // Extract form fields
                    const fields = data.fields || {};

                    // Extract all possible fields
                    if (fields.title?.value) updateStoryDto.title = fields.title.value;
                    if (fields.description?.value)
                        updateStoryDto.description = fields.description.value;
                    if (fields.status?.value) updateStoryDto.status = fields.status.value;
                    if (fields.link?.value) updateStoryDto.link = fields.link.value;
                    if (fields.buttonText?.value)
                        updateStoryDto.buttonText = fields.buttonText.value;
                    if (fields.startDate?.value)
                        updateStoryDto.startDate = new Date(fields.startDate.value);
                    if (fields.endDate?.value)
                        updateStoryDto.endDate = new Date(fields.endDate.value);
                    if (fields.commentAdmin?.value)
                        updateStoryDto.commentAdmin = fields.commentAdmin.value;

                    // Handle branches array
                    if (fields.branches?.value) {
                        try {
                            // Check if it's a JSON array
                            updateStoryDto.branches = JSON.parse(fields.branches.value);
                        } catch (e) {
                            // If not JSON, treat as a comma-separated string
                            updateStoryDto.branches = fields.branches.value
                                .split(',')
                                .map(branch => branch.trim());
                        }
                    }

                    // Convert file to buffer
                    const buffer = await data.toBuffer();

                    // Create a file object
                    const file = {
                        fieldname: data.fieldname,
                        originalname: data.filename,
                        encoding: data.encoding,
                        mimetype: data.mimetype,
                        size: buffer.length,
                        buffer: buffer,
                    };

                    // Upload file to storage via FileService
                    const uploadResult = await this.fileService.uploadFile(file, {
                        folder: 'stories',
                        filename: data.filename,
                    });

                    // Add the new image URL to the update DTO
                    updateStoryDto.mainImage = uploadResult.url;
                }
            } catch (parseError) {
                // If no file was uploaded, or there was an error parsing the multipart form,
                // we'll fall back to the regular JSON body if it exists
                if (!fileUploaded) {
                    this.logger.log('No file uploaded, using regular request body');
                    // We should try to get the body from the request
                    const body = await request.body;
                    if (body && typeof body === 'object') {
                        updateStoryDto = body;
                    }
                } else {
                    throw parseError; // Re-throw if file was uploaded but processing failed
                }
            }

            // If we have an empty update object, nothing to do
            if (Object.keys(updateStoryDto).length === 0) {
                throw new BadRequestException('No update data provided');
            }

            console.log('updateStoryDto', updateStoryDto);
            // Send update to service
            const result = await this.storyService.updateStory(
                id,
                updateStoryDto,
                req.user?.userId || '000000000000000000000000',
            );
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to update story: ${errorMessage}`, error);
            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to update story: ${errorMessage}`);
        }
    }

    @Delete(':id')
    @ApiRemoveStory()
    async removeStory(@Param('id') id: string) {
        this.logger.log(`DELETE /api/v1/stories/${id} - Delete story`);
        try {
            return await this.storyService.deleteStory(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to delete story: ${errorMessage}`);
        }
    }

    @Post('items')
    @ApiCreateStoryItem()
    @ApiConsumes('multipart/form-data')
    async createStoryItem(@Req() request: FastifyRequest, @Request() req: any) {
        this.logger.log('POST /api/v1/stories/items - Create story items');
        try {
            // Process multipart form data
            const data = await (request as any).file();
            if (!data) {
                throw new BadRequestException('File is required');
            }

            // Extract form fields
            const fields = data.fields || {};
            const storyId = fields.storyId?.value;
            const title = fields.title?.value;
            const description = fields.description?.value;
            const orderNumber = fields.orderNumber?.value ? Number(fields.orderNumber.value) : 0;

            if (!storyId || !title) {
                throw new BadRequestException('Story ID and title are required');
            }

            // Convert file to buffer
            const buffer = await data.toBuffer();

            // Create a file object
            const file = {
                fieldname: data.fieldname,
                originalname: data.filename,
                encoding: data.encoding,
                mimetype: data.mimetype,
                size: buffer.length,
                buffer: buffer,
            };

            // Upload file to storage via FileService
            const uploadResult = await this.fileService.uploadFile(file, {
                folder: 'story-items',
                filename: data.filename,
            });

            // Create story item DTO with the uploaded image
            const createStoryItemDto: CreateStoryItemDto = {
                storyId,
                storyItems: [
                    {
                        title,
                        description,
                        image: uploadResult.data.url, // Use the URL returned from file upload
                        orderNumber,
                    },
                ],
            };

            // Create story item
            return await this.storyService.createStoryItem(
                createStoryItemDto,
                req.user?.userId || '000000000000000000000000',
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Failed to create story item: ${errorMessage}`, error);
            throw new BadRequestException(`Failed to create story items: ${errorMessage}`);
        }
    }

    @Get('items/:id')
    @ApiGetStoryItemById()
    async findStoryItemById(@Param('id') id: string) {
        this.logger.log(`GET /api/v1/stories/items/${id} - Get story item`);
        try {
            return await this.storyService.findStoryItemById(id);
        } catch (error) {
            throw new NotFoundException(`Story item with ID ${id} not found`);
        }
    }

    @Put('items/:id')
    @ApiUpdateStoryItem()
    async updateStoryItem(@Param('id') id: string, @Body() updateStoryItemDto: UpdateStoryItemDto) {
        this.logger.log(`PUT /api/v1/stories/items/${id} - Update story item`);
        try {
            return await this.storyService.updateStoryItem(id, updateStoryItemDto);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story item with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to update story item: ${errorMessage}`);
        }
    }

    @Delete('items/:id')
    @ApiDeleteStoryItem()
    async removeStoryItem(@Param('id') id: string) {
        this.logger.log(`DELETE /api/v1/stories/items/${id} - Delete story item`);
        try {
            return await this.storyService.removeStoryItem(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('not found')) {
                throw new NotFoundException(`Story item with ID ${id} not found`);
            }
            throw new BadRequestException(`Failed to delete story item: ${errorMessage}`);
        }
    }
}
