// create-shop-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateShopCategoryDto {
    @ApiProperty({ description: 'Name of the shop category' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @ApiProperty({ description: 'Description of the shop category' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Image URL for the shop category', required: false })
    @IsString()
    imageUrl?: string;
}
