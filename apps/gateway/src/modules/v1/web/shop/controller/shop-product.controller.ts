// shop-product.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ShopProductService } from '../service/shop-product.service';
import { CreateShopProductDto } from '../dto/create-shop-product.dto';
import { UpdateShopProductDto } from '../dto/update-shop-product.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { ShopProductEntity, ShopProductWithCategoryEntity } from '../entity/shop.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Product')
@ApiExtraModels(CommonEntity, ShopProductEntity, ShopProductWithCategoryEntity)
@Controller('shop/product/web')
export class ShopProductController {
    constructor(private readonly shopProductService: ShopProductService) {}

    @Post('presigned-url')
    @ApiOperation({ summary: `Generate Presigned URL for Image Upload` })
    @ApiResponse({
        status: 201,
        description: 'Presigned URL generated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Presigned URL generated successfully' },
                data: { 
                    type: 'object',
                    properties: {
                        url: { type: 'string', example: 'https://presigned-url-example.com' }
                    }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with presigned URL',  
                value: {
                    statusCode: 201,
                    message: 'Presigned URL generated successfully',
                    data: {
                        url: 'https://presigned-url-example.com/upload-path?token=abc123'
                    }
                }
            }
        }
    })
    async generatePresignedUploadUrl(@Body() dto: CreatePresignedUrlDto) {
        return this.shopProductService.generatePresignedUploadUrlForImage(dto);
    }

    @Post()
    @ApiOperation({ summary: `Create Shop Product` })
    @ApiResponse({
        status: 201,
        description: 'Shop Product created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Shop Product created successfully' },
                data: { $ref: getSchemaPath(ShopProductEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created shop product',  
                value: {
                    statusCode: 201,
                    message: 'Shop Product created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Preparation Book',
                        description: 'Comprehensive guide for IELTS preparation',
                        image: 'https://example.com/images/ielts-book.jpg',
                        points: 1000,
                        quantity: 50,
                        shopCategoryId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to create Shop Product',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create Shop Product' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body() createShopProductDto: CreateShopProductDto, @Req() req: CustomRequest) {
        return this.shopProductService.create(createShopProductDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Shop Products` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Shop Products',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Shop Products' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ShopProductWithCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop products',  
                value: {
                    statusCode: 200,
                    message: 'List of Shop Products',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'IELTS Preparation Book',
                            description: 'Comprehensive guide for IELTS preparation',
                            image: 'https://example.com/images/ielts-book.jpg',
                            points: 1000,
                            quantity: 50,
                            shopCategoryId: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            categoryName: 'Books'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            title: 'Study Planner',
                            description: 'Weekly study planner for students',
                            image: 'https://example.com/images/planner.jpg',
                            points: 500,
                            quantity: 100,
                            shopCategoryId: '223e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-02T00:00:00Z',
                            updatedAt: '2023-07-02T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            categoryName: 'Stationery'
                        }
                    ]
                }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.shopProductService.getAll({ page, limit });
    }

    @Get('by-category/:categoryId')
    @ApiOperation({ summary: `Get Shop Products by Category ID` })
    @ApiResponse({
        status: 200,
        description: 'List of Shop Products by Category',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Shop Products by Category' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ShopProductWithCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop products by category',  
                value: {
                    statusCode: 200,
                    message: 'List of Shop Products by Category',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'IELTS Preparation Book',
                            description: 'Comprehensive guide for IELTS preparation',
                            image: 'https://example.com/images/ielts-book.jpg',
                            points: 1000,
                            quantity: 50,
                            shopCategoryId: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            categoryName: 'Books'
                        }
                    ]
                }
            }
        }
    })
    async getByCategory(@Param('categoryId') categoryId: string) {
        return this.shopProductService.getByCategory(categoryId);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Shop Product by ID` })
    @ApiResponse({
        status: 200,
        description: 'Shop Product details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Product details' },
                data: { $ref: getSchemaPath(ShopProductWithCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop product details',  
                value: {
                    statusCode: 200,
                    message: 'Shop Product details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Preparation Book',
                        description: 'Comprehensive guide for IELTS preparation',
                        image: 'https://example.com/images/ielts-book.jpg',
                        points: 1000,
                        quantity: 50,
                        shopCategoryId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        categoryName: 'Books'
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.shopProductService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Shop Product` })
    @ApiResponse({
        status: 200,
        description: 'Shop Product updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Product updated successfully' },
                data: { $ref: getSchemaPath(ShopProductEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated shop product',  
                value: {
                    statusCode: 200,
                    message: 'Shop Product updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Preparation Book - 2023 Edition',
                        description: 'Updated comprehensive guide for IELTS preparation with latest test patterns',
                        image: 'https://example.com/images/ielts-book-2023.jpg',
                        points: 1200,
                        quantity: 75,
                        shopCategoryId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-03T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174003'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Shop Product not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Shop Product not found' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateShopProductDto: UpdateShopProductDto,
        @Req() req: CustomRequest
    ) {
        return this.shopProductService.update(id, updateShopProductDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Shop Product` })
    @ApiResponse({
        status: 200,
        description: 'Shop Product deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Product deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after shop product deletion',  
                value: {
                    statusCode: 200,
                    message: 'Shop Product deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Shop Product not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Shop Product not found' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.shopProductService.delete(id);
    }
}
