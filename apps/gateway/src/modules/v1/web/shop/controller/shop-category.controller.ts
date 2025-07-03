// shop-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ShopCategoryService } from '../service/shop-category.service';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { ShopCategoryEntity } from '../entity/shop.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Category')
@ApiExtraModels(CommonEntity, ShopCategoryEntity)
@Controller('shop/category/web')
export class ShopCategoryController {
    constructor(private readonly shopCategoryService: ShopCategoryService) {}

    @Post()
    @ApiOperation({ summary: `Create Shop Category` })
    @ApiResponse({
        status: 201,
        description: 'Shop Category created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Shop Category created successfully' },
                data: { $ref: getSchemaPath(ShopCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created shop category',  
                value: {
                    statusCode: 201,
                    message: 'Shop Category created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Books',
                        description: 'Educational books and study materials',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to create Shop Category',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create Shop Category' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body() createShopCategoryDto: CreateShopCategoryDto, @Req() req: CustomRequest) {
        return this.shopCategoryService.create(createShopCategoryDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Shop Categories` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Shop Categories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Shop Categories' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ShopCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop categories',  
                value: {
                    statusCode: 200,
                    message: 'List of Shop Categories',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'Books',
                            description: 'Educational books and study materials',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            title: 'Stationery',
                            description: 'School and office supplies',
                            createdAt: '2023-07-02T00:00:00Z',
                            updatedAt: '2023-07-02T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Shop Categories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Shop Categories' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.shopCategoryService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Shop Category by ID` })
    @ApiResponse({
        status: 200,
        description: 'Shop Category details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Category details' },
                data: { $ref: getSchemaPath(ShopCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop category details',  
                value: {
                    statusCode: 200,
                    message: 'Shop Category details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Books',
                        description: 'Educational books and study materials',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Shop Category not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Shop Category not found' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.shopCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Shop Category` })
    @ApiResponse({
        status: 200,
        description: 'Shop Category updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Category updated successfully' },
                data: { $ref: getSchemaPath(ShopCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated shop category',  
                value: {
                    statusCode: 200,
                    message: 'Shop Category updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Books & Study Materials',
                        description: 'Educational books and comprehensive study materials',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-03T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Shop Category not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Shop Category not found' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateShopCategoryDto: UpdateShopCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.shopCategoryService.update(id, updateShopCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Shop Category` })
    @ApiResponse({
        status: 200,
        description: 'Shop Category deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Category deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after shop category deletion',  
                value: {
                    statusCode: 200,
                    message: 'Shop Category deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Shop Category not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Shop Category not found' },
                error: { type: 'string', example: 'Not Found' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.shopCategoryService.delete(id);
    }
}
