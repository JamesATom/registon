// http-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { RedisService } from 'src/modules/v1/redis/redis.service';
import { CustomRequest } from 'src/common/types/types';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtHttpAuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private redisService: RedisService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<CustomRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        const isTokenValid = await this.redisService.validateToken(token);
        if (isTokenValid) {
            throw new UnauthorizedException('Invalid or Expired Token!');
        }

        request.user = token;
        return true;
    }

    private extractTokenFromHeader(request: FastifyRequest): string | null {
        const authHeader = request.headers.authorization;
        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
