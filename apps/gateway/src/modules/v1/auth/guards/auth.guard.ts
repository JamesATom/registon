import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(private readonly redisService: RedisService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        this.logger.debug('AuthGuard canActivate called');
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: any): Promise<boolean> {
        this.logger.debug('Headers received:', request.headers);
        const token = this.extractTokenFromHeader(request);
        console.log('token', token);
        if (!token) {
            this.logger.error('No token provided in header');
            throw new UnauthorizedException('No token provided');
        }

        this.logger.debug(`Validating token: ${token.substring(0, 10)}...`);
        const userData = await this.redisService.getUserByToken(token);
        this.logger.debug('User data from token:', userData ? 'Found' : 'Not found');

        if (!userData) {
            this.logger.error(`Invalid or expired token: ${token.substring(0, 10)}...`);
            throw new UnauthorizedException('Invalid or expired token');
        }

        this.logger.debug('Authentication successful - userData:', userData);
        // Add user data to request object for controllers to use
        request.user = userData;
        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        console.log('request.headers', request.headers);
        const authHeader = request.headers.authorization;
        console.log('authHeader', authHeader);
        if (!authHeader) {
            this.logger.error('No authorization header found');
            return undefined;
        }

        this.logger.debug(`Authorization header: ${authHeader.substring(0, 15)}...`);
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
