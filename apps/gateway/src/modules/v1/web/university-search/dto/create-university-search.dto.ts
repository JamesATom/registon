import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, IsInt, IsEmail, IsUrl, IsUUID, IsDateString, IsArray } from 'class-validator';
import { UniType, StudyLanguage, StudyType } from 'src/modules/v1/web/university-search/enums/university.enum';

export class CreateUniversitySearchDto {
  @ApiProperty({ description: 'Title of the university', example: 'Harvard University' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the university', example: 'One of the prestigious universities in the US' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Type of the university', enum: UniType, example: UniType.Local })
  @IsOptional()
  @IsEnum(UniType)
  type?: UniType;

  @ApiPropertyOptional({ description: 'Status of the university', example: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ description: 'Contract information of the university', example: 'Contract-2025-123' })
  @IsNotEmpty()
  @IsString()
  contract: string;

  @ApiPropertyOptional({ description: 'Contact number of the university', example: 123456789 })
  @IsOptional()
  @IsInt()
  contacts?: number;

  @ApiPropertyOptional({ description: 'Website of the university', example: 'https://www.university.edu' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ description: 'Email of the university', example: 'info@university.edu' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Address of the university', example: '123 University Street, City' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'City ID of the university', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  city?: string;

  @ApiPropertyOptional({ description: 'Logo of the university', example: 'https://images.openfoodfacts.org/images/products/000/010/120/9159/1.jpg' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ description: 'License of the university', example: 'https://www.princexml.com/samples/invoice-colorful/invoicesample.pdf' })
  @IsOptional()
  @IsString()
  license?: string;

  @ApiPropertyOptional({ description: 'Certificate requirement ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  certificateRequirement?: string;

  @ApiPropertyOptional({ description: 'Study languages offered', enum: StudyLanguage, isArray: true, example: [StudyLanguage.English, StudyLanguage.Uzbek] })
  @IsOptional()
  @IsArray()
  @IsEnum(StudyLanguage, { each: true })
  studyLanguages?: StudyLanguage[];

  @ApiPropertyOptional({ description: 'Study types offered', enum: StudyType, isArray: true, example: [StudyType.FullTime, StudyType.Remote] })
  @IsOptional()
  @IsArray()
  @IsEnum(StudyType, { each: true })
  studyTypes?: StudyType[];
}
