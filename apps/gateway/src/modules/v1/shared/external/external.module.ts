// external.module.ts
import { Global, Module } from '@nestjs/common';
import { ExternalService } from './external.service';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
    imports: [RedisModule],
    controllers: [],
    providers: [ExternalService],
    exports: [ExternalService],
})
export class ExternalModule {}
