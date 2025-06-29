// news-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NewsCategoryService } from '../service/news-category.service';
import { CreateNewsCategoryDto } from '../dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from '../dto/update-news-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - News Categories')
@Controller('news/categories/web')
export class NewsCategoryController {
    constructor(private readonly newsCategoryService: NewsCategoryService) {}

    @Get()
    @ApiGetAll('News Category', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.newsCategoryService.getAll();
    }

    @Post()
    @ApiCreate('News Category', CommonEntity)
    @ApiBody({ type: CreateNewsCategoryDto })
    async create(@Body() createNewsCategoryDto: CreateNewsCategoryDto, @Req() req: CustomRequest) {
        return this.newsCategoryService.create(createNewsCategoryDto, req.user.userId);
    }

    @Get(':id')
    @ApiGetOne('News Category')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.newsCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('News Category', CommonEntity)
    @ApiBody({ type: UpdateNewsCategoryDto })
    async update(
        @Param('id') id: string, 
        @Body() updateNewsCategoryDto: UpdateNewsCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.newsCategoryService.update(id, updateNewsCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('News Category')
    async delete(@Param('id') id: string) {
        return this.newsCategoryService.delete(id);
    }
}
