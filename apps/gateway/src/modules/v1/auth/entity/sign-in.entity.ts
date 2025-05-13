// sign-in.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class SignInEntity {
    @ApiProperty({ example: 0 })
    code: number;

    @ApiProperty({ example: 'Success' })
    message: string;

    @ApiProperty({
        example: {
            _id: '61dbe38be35f52c9ef27886e',
            hasPassword: false
        }
    })
    data: {
        _id: string;
        hasPassword: boolean;
    };

    @ApiProperty({ example: 200 })
    statusCode: number;
}