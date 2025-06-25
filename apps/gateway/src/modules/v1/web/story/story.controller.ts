// story.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { CustomRequest } from 'src/common/types/types';
import { StoryService } from './service/story.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { FilterStoryDto } from './dto/filter-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Story')
@Controller('web/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'story-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiCreate('Presigned Upload URL')
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.storyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Story', CommonEntity)
    @ApiBody({ type: CreateStoryDto })
    async create(@Body(BranchValidationPipe) createStoryDto: CreateStoryDto, @Req() req: CustomRequest) {
        return this.storyService.create(createStoryDto, req.user);
    }

    @Get()
    @ApiGetAll('Story', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(@Query() filter: FilterStoryDto) {
        return this.storyService.getAll(filter);
    }

    @Get(':id')
    @ApiGetOne('Story')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.storyService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Story', CommonEntity)
    @ApiBody({ type: UpdateStoryDto })
    async update(@Param('id') id: string, @Body(BranchValidationPipe) updateStoryDto: UpdateStoryDto, @Req() req: CustomRequest) {
        return this.storyService.update(id, updateStoryDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('Story')
    async delete(@Param('id') id: string) {
        return this.storyService.delete(id);
    }
}
