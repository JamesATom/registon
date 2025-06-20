import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsUUID, IsArray } from 'class-validator';
import { UniType, StudyLanguage, StudyType } from 'src/modules/v1/web/university-search/enums/university.enum';

export class FilterUniversitySearchDto {
  @ApiPropertyOptional({ description: 'Search term to look in title and description', example: 'international' })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiPropertyOptional({ description: 'University type', enum: UniType, example: UniType.International })
  @IsOptional()
  @IsEnum(UniType)
  type?: UniType;

  @ApiPropertyOptional({ description: 'City ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @ApiPropertyOptional({ description: 'Certificate Requirement ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  certificateRequirementId?: string;

  @ApiPropertyOptional({ description: 'Study languages', enum: StudyLanguage, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(StudyLanguage, { each: true })
  studyLanguages?: StudyLanguage[];

  @ApiPropertyOptional({ description: 'Study types', enum: StudyType, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(StudyType, { each: true })
  studyTypes?: StudyType[];
}
