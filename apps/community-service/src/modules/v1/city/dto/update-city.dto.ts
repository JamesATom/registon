import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @IsOptional()
    @IsUUID()
    id?: string;
}
