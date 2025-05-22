import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsEmail,
    IsPhoneNumber,
    IsEnum,
} from 'class-validator';
import { IeltsExamType } from '../../../../../common/enum/common.enum';

export class CreateIeltsRegistrationDto {
    @ApiProperty({
        description: 'Exam id',
        example: '60a7c8b9e4b0c1234567890',
    })
    @IsString()
    @IsNotEmpty()
    examId: string;

    @ApiProperty({
        description: 'Fullname of student for enrolling',
        example: 'Abduqodir Khusanov',
    })
    @MinLength(5)
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        description: 'Exam type choose IELTS or MOCK',
        example: 'IELTS',
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(IeltsExamType)
    examType: string;

    @ApiProperty({
        description: 'Email of student for enrolling',
        example: 'abduqodir.khusanov@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Phone number of student for enrolling',
        example: '+998991234567',
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;
}
