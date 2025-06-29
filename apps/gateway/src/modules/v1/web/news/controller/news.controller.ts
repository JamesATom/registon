// news.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NewsService } from '../service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - News')
@Controller('news/web')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    @ApiGetAll('News', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.newsService.getAll();
    }

    @Post()
    @ApiCreate('News', CommonEntity)
    @ApiBody({ type: CreateNewsDto })
    async create(@Body() createNewsDto: CreateNewsDto, @Req() req: CustomRequest) {
        return this.newsService.create(createNewsDto, req.user.userId);
    }

    @Get(':id')
    @ApiGetOne('News')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.newsService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('News', CommonEntity)
    @ApiBody({ type: UpdateNewsDto })
    async update(
        @Param('id') id: string, 
        @Body() updateNewsDto: UpdateNewsDto,
        @Req() req: CustomRequest
    ) {
        return this.newsService.update(id, updateNewsDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('News')
    async delete(@Param('id') id: string) {
        return this.newsService.delete(id);
    }
}
