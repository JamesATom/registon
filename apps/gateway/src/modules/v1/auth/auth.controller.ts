// auth.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    
    @ApiOperation({ 
        summary: 'User login', 
        description: 'Authenticate a user and return a JWT token. Required fields: username and password.'
    })
    @Get('login')
    login() {
        return 'Login page';
    }

}
