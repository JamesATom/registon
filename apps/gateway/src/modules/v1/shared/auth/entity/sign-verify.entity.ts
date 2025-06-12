// sign-verify.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class SignVerifyEntity {
    @ApiProperty({ example: 0 })
    code: number;

    @ApiProperty({ example: 'Success' })
    message: string;

    @ApiProperty({
        example: {
            _id: '67bf01f299c5d4f5a65db065',
            firstName: 'Iqboljon',
            phoneNumber: '+998900590103',
            fullName: 'Iqboljon',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            hasPassword: false,
        },
    })
    data: {
        _id: string;
        firstName: string;
        phoneNumber: string;
        fullName: string;
        token: string;
        hasPassword: boolean;
    };

    @ApiProperty({ example: 200 })
    statusCode: number;
}
