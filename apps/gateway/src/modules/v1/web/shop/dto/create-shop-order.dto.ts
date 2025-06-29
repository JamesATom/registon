// create-shop-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type as TransformType } from 'class-transformer';

class OrderItemDto {
    @ApiProperty({ description: 'ID of the product' })
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantity of the product' })
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateShopOrderDto {
    @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @TransformType(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty({ description: 'Shipping address' })
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @ApiProperty({ description: 'Contact phone number' })
    @IsString()
    @IsNotEmpty()
    contactPhone: string;

    @ApiProperty({ description: 'Additional notes for the order', required: false })
    @IsString()
    @IsNotEmpty()
    notes?: string;
}
