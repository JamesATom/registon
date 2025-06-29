// shop-order.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ShopOrderService } from '../service/shop-order.service';
import { CreateShopOrderDto } from '../dto/create-shop-order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop-order.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { ShopOrderStatus } from '../enums/shop.enum';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Shop - Order')
@Controller('shop/order/web')
export class ShopOrderController {
    constructor(private readonly shopOrderService: ShopOrderService) {}

    @Post()
    @ApiCreate('Shop Order')
    @ApiResponse({ type: CommonEntity })
    async create(@Body() createShopOrderDto: CreateShopOrderDto, @Req() req: CustomRequest) {
        return this.shopOrderService.create(createShopOrderDto, req.user.userId);
    }

    @Get()
    @ApiGetAll('Shop Order', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.shopOrderService.getAll();
    }

    @Get('my-orders')
    @ApiResponse({ type: [CommonEntity] })
    async getMyOrders(@Req() req: CustomRequest) {
        return this.shopOrderService.getByStudent(req.user.userId);
    }

    @Get(':id')
    @ApiGetOne('Shop Order')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.shopOrderService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Shop Order', CommonEntity)
    @ApiResponse({ type: CommonEntity })
    async update(
        @Param('id') id: string, 
        @Body() updateShopOrderDto: UpdateShopOrderDto,
        @Req() req: CustomRequest
    ) {
        return this.shopOrderService.update(id, updateShopOrderDto, req.user.userId);
    }

    @Put(':id/status')
    @ApiResponse({ type: CommonEntity })
    async updateStatus(
        @Param('id') id: string, 
        @Body('status') status: ShopOrderStatus,
        @Req() req: CustomRequest
    ) {
        return this.shopOrderService.updateStatus(id, status, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('Shop Order')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.shopOrderService.delete(id);
    }
}
