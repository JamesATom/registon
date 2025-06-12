// shared.module.ts
import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { BranchModule } from './branch/branch.module';
import { CityModule } from './city/city.module';
import { ExternalModule } from './external/external.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        RedisModule,
        BranchModule,
        CityModule,
        ExternalModule,
        AuthModule,
    ],
    exports: [
        RedisModule,
        BranchModule,
        CityModule,
        ExternalModule,
        AuthModule,
    ],
})
export class SharedModule {}
