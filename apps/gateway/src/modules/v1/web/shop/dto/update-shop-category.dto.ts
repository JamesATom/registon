// update-shop-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateShopCategoryDto {
    @ApiProperty({ description: 'Name of the shop category', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?: string;

    @ApiProperty({ description: 'Description of the shop category', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Image URL for the shop category', required: false })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}
