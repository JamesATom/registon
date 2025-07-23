// create-city.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @ApiProperty({ description: 'City name', example: 'Tashkent' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ description: 'Is the city active', example: true, default: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;
}
