// create-shop-product.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateShopProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  shopCategoryId: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
