// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { RedisModule } from 'src/modules/v1/redis/redis.module';

@Module({
	imports: [RedisModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
