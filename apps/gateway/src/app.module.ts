// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/v1/shared/shared.module';
import { WebModule } from './modules/v1/web/web.module';
import { MobileModule } from './modules/v1/mobile/mobile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        SharedModule,
        WebModule,
        MobileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
