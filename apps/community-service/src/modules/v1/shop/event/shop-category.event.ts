// shop-category.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { ShopCategoryService } from '../service/shop-category.service';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';

@Controller()
export class ShopCategoryEvent {
    constructor(private readonly shopCategoryService: ShopCategoryService) {}

    @MessagePattern(MessagePatterns.Shop.V1.Category.CREATE)
    async create(@Payload() createShopCategoryDto: CreateShopCategoryDto): Promise<any> {
        return this.shopCategoryService.create(createShopCategoryDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Category.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.shopCategoryService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Category.GET_ONE)
    async getOne(@Payload() id: string): Promise<any> {
        return this.shopCategoryService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Category.UPDATE)
    async update(
        @Payload() payload: { id: string; updateShopCategoryDto: UpdateShopCategoryDto },
    ): Promise<any> {
        return this.shopCategoryService.update(payload.id, payload.updateShopCategoryDto);
    }

    @MessagePattern(MessagePatterns.Shop.V1.Category.DELETE)
    async delete(@Payload() id: string): Promise<any> {
        return this.shopCategoryService.delete(id);
    }
}
