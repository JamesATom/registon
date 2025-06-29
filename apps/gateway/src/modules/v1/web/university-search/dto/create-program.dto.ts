// create-program.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsInt } from 'class-validator';
import { Degree, StudyLanguage, StudyType } from '../enums/university-search.enum';

export class CreateProgramDto {
    @ApiProperty({ 
        description: 'Title of the program',
        example: 'Computer Science'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ 
        description: 'Description of the program',
        example: 'The Computer Science program at Harvard provides students with a solid foundation in the theoretical and mathematical foundations of computing.'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ 
        description: 'Language of study', 
        enum: StudyLanguage,
        example: StudyLanguage.ENGLISH
    })
    @IsEnum(StudyLanguage)
    @IsNotEmpty()
    studyLanguage: StudyLanguage;

    @ApiProperty({ 
        description: 'Contract cost amount',
        example: 49653
    })
    @IsInt()
    @IsNotEmpty()
    contract: number;

    @ApiProperty({ 
        description: 'Degree level of the program', 
        enum: Degree,
        example: Degree.BACHELOR
    })
    @IsEnum(Degree)
    @IsNotEmpty()
    degree: Degree;

    @ApiProperty({ 
        description: 'Study type of the program', 
        enum: StudyType,
        example: StudyType.FULL_TIME
    })
    @IsEnum(StudyType)
    @IsOptional()
    studyType?: StudyType;
    
    @ApiProperty({ 
        description: 'University ID that the program belongs to',
        example: '5f8d0d55b54764421b715701'
    })
    @IsString()
    @IsNotEmpty()
    universityId: string;

    @ApiProperty({ 
        description: 'Faculty ID that the program belongs to',
        example: '5f8d0d55b54764421b715702'
    })
    @IsString()
    @IsOptional()
    facultyId?: string;
}
