import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IeltsExamStatus } from '../../../../shared/models/ielts-exam.schema';

export class FindIeltsExamsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: IeltsExamStatus })
  @IsOptional()
  @IsEnum(IeltsExamStatus)
  status?: IeltsExamStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  limit?: number = 10;
}
