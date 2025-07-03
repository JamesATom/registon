// shop-order.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ShopOrderService } from '../service/shop-order.service';
import { CreateShopOrderDto } from '../dto/create-shop-order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop-order.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { ShopOrderStatus } from '../enums/shop.enum';
import { ShopOrderEntity, ShopOrderWithProductEntity } from '../entity/shop.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Order')
@ApiExtraModels(CommonEntity, ShopOrderEntity, ShopOrderWithProductEntity)
@Controller('shop/order/web')
export class ShopOrderController {
    constructor(private readonly shopOrderService: ShopOrderService) {}

    @Post()
    @ApiOperation({ summary: `Create Shop Order` })
    @ApiResponse({
        status: 201,
        description: 'Shop Order created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Shop Order created successfully' },
                data: { $ref: getSchemaPath(ShopOrderEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created shop order',  
                value: {
                    statusCode: 201,
                    message: 'Shop Order created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        product: '123e4567-e89b-12d3-a456-426614174001',
                        student: '123e4567-e89b-12d3-a456-426614174002',
                        status: 'READY',
                        points: 1000,
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
        description: 'Failed to create Shop Order',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create Shop Order' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body() createShopOrderDto: CreateShopOrderDto, @Req() req: CustomRequest) {
        return this.shopOrderService.create(createShopOrderDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Shop Orders` })
    @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page (default: 10)' })
    @ApiResponse({
        status: 200,
        description: 'List of Shop Orders',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Shop Orders' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ShopOrderWithProductEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop orders',  
                value: {
                    statusCode: 200,
                    message: 'List of Shop Orders',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            product: '123e4567-e89b-12d3-a456-426614174001',
                            student: '123e4567-e89b-12d3-a456-426614174002',
                            status: 'READY',
                            points: 1000,
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            productDetails: {
                                id: '123e4567-e89b-12d3-a456-426614174001',
                                title: 'IELTS Preparation Book',
                                description: 'Comprehensive guide for IELTS preparation',
                                image: 'https://example.com/images/ielts-book.jpg',
                                points: 1000,
                                quantity: 50,
                                shopCategoryId: '123e4567-e89b-12d3-a456-426614174003',
                                categoryName: 'Books'
                            }
                        }
                    ]
                }
            }
        }
    })
    async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
        return this.shopOrderService.getAll({ page, limit });
    }

    @Get('my-orders')
    @ApiOperation({ summary: `Get Current Student's Shop Orders` })
    @ApiResponse({
        status: 200,
        description: 'List of Current Student\'s Shop Orders',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of My Shop Orders' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ShopOrderWithProductEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with student\'s shop orders',  
                value: {
                    statusCode: 200,
                    message: 'List of My Shop Orders',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            product: '123e4567-e89b-12d3-a456-426614174001',
                            student: '123e4567-e89b-12d3-a456-426614174002',
                            status: 'READY',
                            points: 1000,
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            productDetails: {
                                id: '123e4567-e89b-12d3-a456-426614174001',
                                title: 'IELTS Preparation Book',
                                description: 'Comprehensive guide for IELTS preparation',
                                image: 'https://example.com/images/ielts-book.jpg',
                                points: 1000,
                                quantity: 50,
                                shopCategoryId: '123e4567-e89b-12d3-a456-426614174003',
                                categoryName: 'Books'
                            }
                        }
                    ]
                }
            }
        }
    })
    async getMyOrders(@Req() req: CustomRequest) {
        return this.shopOrderService.getByStudent(req.user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Shop Order by ID` })
    @ApiResponse({
        status: 200,
        description: 'Shop Order details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Order details' },
                data: { $ref: getSchemaPath(ShopOrderWithProductEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with shop order details',  
                value: {
                    statusCode: 200,
                    message: 'Shop Order details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        product: '123e4567-e89b-12d3-a456-426614174001',
                        student: '123e4567-e89b-12d3-a456-426614174002',
                        status: 'READY',
                        points: 1000,
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        productDetails: {
                            id: '123e4567-e89b-12d3-a456-426614174001',
                            title: 'IELTS Preparation Book',
                            description: 'Comprehensive guide for IELTS preparation',
                            image: 'https://example.com/images/ielts-book.jpg',
                            points: 1000,
                            quantity: 50,
                            shopCategoryId: '123e4567-e89b-12d3-a456-426614174003',
                            categoryName: 'Books'
                        }
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.shopOrderService.getOne(id);
    }

    @Put(':id/status')
    @ApiOperation({ summary: `Update Shop Order Status` })
    @ApiResponse({
        status: 200,
        description: 'Shop Order status updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Order status updated successfully' },
                data: { $ref: getSchemaPath(ShopOrderEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated shop order status',  
                value: {
                    statusCode: 200,
                    message: 'Shop Order status updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        product: '123e4567-e89b-12d3-a456-426614174001',
                        student: '123e4567-e89b-12d3-a456-426614174002',
                        status: 'SENT',
                        points: 1000,
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-03T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174003'
                    }
                }
            }
        }
    })
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
        @Req() req: CustomRequest
    ) {
        return this.shopOrderService.updateStatus(id, status, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Shop Order` })
    @ApiResponse({
        status: 200,
        description: 'Shop Order deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Shop Order deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after shop order deletion',  
                value: {
                    statusCode: 200,
                    message: 'Shop Order deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.shopOrderService.delete(id);
    }
}
