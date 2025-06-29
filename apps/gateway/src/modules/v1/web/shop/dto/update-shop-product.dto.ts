// update-shop-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsUUID, MaxLength } from 'class-validator';

export class UpdateShopProductDto {
    @ApiProperty({ description: 'Name of the product', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?: string;

    @ApiProperty({ description: 'Description of the product', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Price of the product', required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number;

    @ApiProperty({ description: 'Quantity available in stock', required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    stockQuantity?: number;

    @ApiProperty({ description: 'ID of the shop category this product belongs to', required: false })
    @IsUUID()
    @IsOptional()
    shopCategoryId?: string;

    @ApiProperty({ description: 'Image URL for the product', required: false })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}
