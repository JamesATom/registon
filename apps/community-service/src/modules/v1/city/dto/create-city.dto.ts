// create-city.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
}
