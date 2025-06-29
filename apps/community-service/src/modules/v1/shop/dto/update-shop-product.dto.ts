// update-shop-product.dto.ts
import { IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateShopProductDto } from './create-shop-product.dto';

export class UpdateShopProductDto extends PartialType(CreateShopProductDto) {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @IsUUID()
  shopCategoryId?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
