// create-shop-order.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateShopOrderDto {
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @IsNotEmpty()
  @IsUUID()
  student: string;

  @IsOptional()
  @IsEnum(['READY', 'ACCEPTED', 'SENT', 'FINISHED'])
  status?: 'READY' | 'ACCEPTED' | 'SENT' | 'FINISHED' = 'READY';

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  points: number;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
