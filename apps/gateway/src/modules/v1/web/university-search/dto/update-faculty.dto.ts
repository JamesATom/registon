// update-faculty.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateFacultyDto {
    @ApiProperty({ 
        description: 'Title of the faculty',
        example: 'School of Engineering and Applied Sciences'
    })
    @IsString()
    @IsOptional()
    facultyTitle?: string;

    @ApiProperty({ 
        description: 'Description of the faculty',
        example: 'The Harvard John A. Paulson School of Engineering and Applied Sciences (SEAS) is the engineering school within Harvard University\'s Faculty of Arts and Sciences.'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ 
        description: 'University ID that the faculty belongs to',
        example: '5f8d0d55b54764421b715701'
    })
    @IsString()
    @IsOptional()
    universityId?: string;
}
