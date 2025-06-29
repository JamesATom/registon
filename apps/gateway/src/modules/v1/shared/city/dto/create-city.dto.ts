// create-city.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @ApiProperty({ description: 'City name', example: 'Tashkent' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
}
