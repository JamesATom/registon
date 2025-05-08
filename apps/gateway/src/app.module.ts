// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './modules/v1/auth/auth.module';

@Module({
    imports: [
		ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientsModule.registerAsync([
            {
                name: 'COMMUNITY_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672'],
                        queue: 'community_service_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                }),
            },
        ]),
        AuthModule,
	],
    controllers: [],
    providers: [],
})
export class AppModule {}