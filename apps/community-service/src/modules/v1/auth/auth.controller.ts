import {
  Controller,
  Get,
  Headers,
  Logger,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('token-check')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Check if JWT token is valid and show payload' })
  @ApiResponse({
    status: 200,
    description: 'Token is valid, shows extracted user details',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, token is invalid or missing',
  })
  checkToken(@Request() req, @Headers('authorization') authHeader: string) {
    this.logger.log('Token check endpoint called');
    this.logger.log(
      `Auth header received: ${authHeader ? authHeader.substring(0, 20) + '...' : 'none'}`,
    );
    this.logger.log(`Extracted user data: ${JSON.stringify(req.user)}`);

    return {
      message: 'Authentication successful',
      user: req.user,
      tokenType: authHeader?.split(' ')?.[0] || 'None',
    };
  }
}
