// update-shop-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ShopOrderStatus } from '../enums/shop.enum';

export class UpdateShopOrderDto {
    @ApiProperty({ description: 'Shipping address', required: false })
    @IsString()
    @IsOptional()
    shippingAddress?: string;

    @ApiProperty({ description: 'Contact phone number', required: false })
    @IsString()
    @IsOptional()
    contactPhone?: string;

    @ApiProperty({ description: 'Additional notes for the order', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({ 
        description: 'Order status', 
        enum: ShopOrderStatus, 
        required: false 
    })
    @IsEnum(ShopOrderStatus)
    @IsOptional()
    status?: ShopOrderStatus;
}
