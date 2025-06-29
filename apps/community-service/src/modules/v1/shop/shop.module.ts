// shop.module.ts
import { Module } from '@nestjs/common';
import { ShopRepository } from './repository/shop.repository';
import { ShopCategoryService } from './service/shop-category.service';
import { ShopProductService } from './service/shop-product.service';
import { ShopOrderService } from './service/shop-order.service';
import { ShopCategoryEvent } from './event/shop-category.event';
import { ShopProductEvent } from './event/shop-product.event';
import { ShopOrderEvent } from './event/shop-order.event';

@Module({
  controllers: [ShopCategoryEvent, ShopProductEvent, ShopOrderEvent],
  providers: [
    ShopCategoryService,
    ShopProductService,
    ShopOrderService,
    ShopRepository,
  ],
})
export class ShopModule {}
