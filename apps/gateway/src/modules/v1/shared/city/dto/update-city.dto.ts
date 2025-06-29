// update-city.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
}
