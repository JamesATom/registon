// create-city.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;
}
