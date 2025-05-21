// common.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class CommonEntity<T = any> {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Operation completed successfully' })
    message: string;

    @ApiProperty({ description: 'Data returned', example: {}, required: false })
    data: T | {} = {}; 
}
