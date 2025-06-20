// faq-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FaqCategoryService } from '../service/faq-category.service';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - FAQ Category')
@Controller('faq-category/web')
export class FaqCategoryController {
    constructor(private readonly faqCategoryService: FaqCategoryService) {}

    @Get()
    @ApiGetAll('FAQ Category', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.faqCategoryService.getAll();
    }

    @Post()
    @ApiCreate('FAQ Category', CommonEntity)
    @ApiBody({ type: CreateFaqCategoryDto })
    async create(@Body() createFaqCategoryDto: CreateFaqCategoryDto, @Req() req: CustomRequest) {
        return this.faqCategoryService.create(createFaqCategoryDto, req.user.userId);
    }

    @Get(':id')
    @ApiGetOne('FAQ Category')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.faqCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('FAQ Category', CommonEntity)
    @ApiBody({ type: UpdateFaqCategoryDto })
    async update(
        @Param('id') id: string, 
        @Body() updateFaqCategoryDto: UpdateFaqCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.faqCategoryService.update(id, updateFaqCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('FAQ Category')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.faqCategoryService.delete(id);
    }
}
