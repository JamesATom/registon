// shop-product.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { ShopProductService } from '../service/shop-product.service';
import { CreateShopProductDto } from '../dto/create-shop-product.dto';
import { UpdateShopProductDto } from '../dto/update-shop-product.dto';

@Controller()
export class ShopProductEvent {
    constructor(private readonly shopProductService: ShopProductService) {}

    @MessagePattern(MessagePatterns.Shop.V1.Product.CREATE)
    async create(@Payload() createShopProductDto: CreateShopProductDto): Promise<any> {
        return this.shopProductService.create(createShopProductDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Product.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.shopProductService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Product.GET_ONE)
    async getOne(@Payload() id: string): Promise<any> {
        return this.shopProductService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Product.GET_BY_CATEGORY)
    async getByCategory(@Payload() categoryId: string): Promise<any> {
        return this.shopProductService.getByCategory(categoryId);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Product.UPDATE)
    async update(
        @Payload() payload: { id: string; updateShopProductDto: UpdateShopProductDto },
    ): Promise<any> {
        return this.shopProductService.update(payload.id, payload.updateShopProductDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Product.DELETE)
    async delete(@Payload() id: string): Promise<any> {
        return this.shopProductService.delete(id);
    }
}
