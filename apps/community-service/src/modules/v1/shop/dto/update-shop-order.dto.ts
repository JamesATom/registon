// update-shop-order.dto.ts
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateShopOrderDto } from './create-shop-order.dto';

export class UpdateShopOrderDto extends PartialType(CreateShopOrderDto) {
  @IsOptional()
  @IsUUID()
  product?: string;

  @IsOptional()
  @IsUUID()
  student?: string;

  @IsOptional()
  @IsEnum(['READY', 'ACCEPTED', 'SENT', 'FINISHED'])
  status?: 'READY' | 'ACCEPTED' | 'SENT' | 'FINISHED';

  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
