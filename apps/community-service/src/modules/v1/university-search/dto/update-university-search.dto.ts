import { PartialType } from '@nestjs/swagger';
import { CreateUniversitySearchDto } from './create-university-search.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUniversitySearchDto extends PartialType(CreateUniversitySearchDto) {
    @IsNotEmpty()
    @IsString()
    updatedBy: string;
}
