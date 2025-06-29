// shop.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { ShopCategoryController } from './controller/shop-category.controller';
import { ShopProductController } from './controller/shop-product.controller';
import { ShopOrderController } from './controller/shop-order.controller';
import { ShopCategoryService } from './service/shop-category.service';
import { ShopProductService } from './service/shop-product.service';
import { ShopOrderService } from './service/shop-order.service';

@Module({
    imports: [CommunityService],
    controllers: [
        ShopCategoryController,
        ShopProductController,
        ShopOrderController
    ],
    providers: [
        ShopCategoryService,
        ShopProductService,
        ShopOrderService
    ],
    exports: [
        ShopCategoryService,
        ShopProductService,
        ShopOrderService
    ]
})
export class ShopModule {}
