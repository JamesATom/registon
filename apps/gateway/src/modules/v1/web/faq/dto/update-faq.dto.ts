// update-faq.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
    @ApiPropertyOptional({ 
        description: 'Question text',
        example: 'How do I register for an IELTS exam?'
    })
    @IsString()
    @IsOptional()
    question?: string;
    
    @ApiPropertyOptional({ 
        description: 'Answer text',
        example: 'To register for an IELTS exam, you need to create an account on our website and follow the registration process under the IELTS section.'
    })
    @IsString()
    @IsOptional()
    answer?: string;
    
    @ApiPropertyOptional({ 
        description: 'FAQ Category ID',
        example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab'
    })
    @IsString()
    @IsOptional()
    categoryId?: string;
}
