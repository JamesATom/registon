import { PartialType } from '@nestjs/swagger';
import { CreateUniversitySearchDto } from './create-university-search.dto';

export class UpdateUniversitySearchDto extends PartialType(CreateUniversitySearchDto) {}
