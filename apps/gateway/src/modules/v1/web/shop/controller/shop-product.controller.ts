// shop-product.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ShopProductService } from '../service/shop-product.service';
import { CreateShopProductDto } from '../dto/create-shop-product.dto';
import { UpdateShopProductDto } from '../dto/update-shop-product.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Product')
@Controller('shop/product/web')
export class ShopProductController {
    constructor(private readonly shopProductService: ShopProductService) {}

    @Post('presigned-url')
    @ApiResponse({ type: CommonEntity })
    async generatePresignedUploadUrl(@Body() dto: CreatePresignedUrlDto) {
        return this.shopProductService.generatePresignedUploadUrlForImage(dto);
    }

    @Post()
    @ApiCreate('Shop Product')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createShopProductDto: CreateShopProductDto, @Req() req: CustomRequest) {
        return this.shopProductService.create(createShopProductDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Shop Product', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.shopProductService.getAll();
    }

    @Get('by-category/:categoryId')
    @ApiResponse({ type: [CommonEntity] })
    async getByCategory(@Param('categoryId') categoryId: string) {
        return this.shopProductService.getByCategory(categoryId);
    }

    @Get(':id')
    @ApiGetOne('Shop Product')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.shopProductService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Shop Product', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateShopProductDto: UpdateShopProductDto,
        @Req() req: CustomRequest
    ) {
        return this.shopProductService.update(id, updateShopProductDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Shop Product')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.shopProductService.delete(id);
    }
}
