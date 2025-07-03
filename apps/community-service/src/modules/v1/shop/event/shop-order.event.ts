// shop-order.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { ShopOrderService } from '../service/shop-order.service';
import { CreateShopOrderDto } from '../dto/create-shop-order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop-order.dto';

@Controller()
export class ShopOrderEvent {
    constructor(private readonly shopOrderService: ShopOrderService) {}

    @MessagePattern(MessagePatterns.Shop.V1.Order.CREATE)
    async create(@Payload() createShopOrderDto: CreateShopOrderDto): Promise<any> {
        return this.shopOrderService.create(createShopOrderDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.shopOrderService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.GET_ONE)
    async getOne(@Payload() id: string): Promise<any> {
        return this.shopOrderService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.GET_BY_STUDENT)
    async getByStudent(@Payload() studentId: string): Promise<any> {
        return this.shopOrderService.getByStudent(studentId);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.UPDATE)
    async update(
        @Payload() payload: { id: string; updateShopOrderDto: UpdateShopOrderDto },
    ): Promise<any> {
        return this.shopOrderService.update(payload.id, payload.updateShopOrderDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.UPDATE_STATUS)
    async updateStatus(
        @Payload() payload: { id: string; status: string; updatedBy: string },
    ): Promise<any> {
        return this.shopOrderService.updateStatus(payload.id, payload.status, payload.updatedBy);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Order.DELETE)
    async delete(@Payload() id: string): Promise<any> {
        return this.shopOrderService.delete(id);
    }
}
