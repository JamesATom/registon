// create-shop-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUUID, MaxLength, IsOptional } from 'class-validator';

export class CreateShopProductDto {
    @ApiProperty({ description: 'Name of the product' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({ description: 'Description of the product' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Price of the product' })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Quantity available in stock' })
    @IsNumber()
    @Min(0)
    stockQuantity: number;

    @ApiProperty({ description: 'ID of the shop category this product belongs to' })
    @IsUUID()
    @IsNotEmpty()
    shopCategoryId: string;

    @ApiProperty({ description: 'Image URL for the product', required: false })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}
