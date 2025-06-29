// shop-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ShopCategoryService } from '../service/shop-category.service';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Category')
@Controller('shop/category/web')
export class ShopCategoryController {
    constructor(private readonly shopCategoryService: ShopCategoryService) {}

    @Post()
    @ApiCreate('Shop Category')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createShopCategoryDto: CreateShopCategoryDto, @Req() req: CustomRequest) {
        return this.shopCategoryService.create(createShopCategoryDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Shop Category', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.shopCategoryService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Shop Category')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.shopCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Shop Category', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateShopCategoryDto: UpdateShopCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.shopCategoryService.update(id, updateShopCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Shop Category')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.shopCategoryService.delete(id);
    }
}
