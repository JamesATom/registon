// update-shop-category.dto.ts
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateShopCategoryDto } from './create-shop-category.dto';

export class UpdateShopCategoryDto extends PartialType(CreateShopCategoryDto) {
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
  updatedBy?: string;
}
