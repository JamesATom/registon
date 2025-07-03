// shop.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class ShopCategoryEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Books' })
  title: string;

  @ApiProperty({ example: 'Educational books and materials' })
  description: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  createdBy: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  updatedBy: string;
}

export class ShopProductEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'IELTS Study Guide' })
  title: string;

  @ApiProperty({ example: 'Comprehensive guide for IELTS preparation' })
  description: string;

  @ApiProperty({ example: 'https://example.com/product-image.jpg' })
  image: string;

  @ApiProperty({ example: 100 })
  points: number;

  @ApiProperty({ example: 50 })
  quantity: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  shopCategoryId: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  createdBy: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
  updatedBy: string;
}

export class ShopProductWithCategoryEntity extends ShopProductEntity {
  @ApiProperty({ type: ShopCategoryEntity })
  category: ShopCategoryEntity;
}

export class ShopOrderEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  product: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  student: string;

  @ApiProperty({ example: 'READY', enum: ['READY', 'ACCEPTED', 'SENT', 'FINISHED'] })
  status: 'READY' | 'ACCEPTED' | 'SENT' | 'FINISHED';

  @ApiProperty({ example: 100 })
  points: number;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
  createdBy: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174004' })
  updatedBy: string;
}

export class ShopOrderWithProductEntity extends ShopOrderEntity {
  @ApiProperty({ type: ShopProductEntity })
  productDetails: ShopProductEntity;
}
