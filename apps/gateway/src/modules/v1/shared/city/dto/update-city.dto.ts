// update-city.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @ApiProperty({ description: 'Is the city active', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
