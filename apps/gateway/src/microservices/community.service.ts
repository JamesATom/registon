// community.service.ts
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CommunityService = ClientsModule.registerAsync([
    {
        name: 'COMMUNITY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
                urls: [configService.get<string>('RABBITMQ_URL')],
                queue: configService.get<string>('RABBITMQ_COMMUNITY_SERVICE_QUEUE'),
                queueOptions: {
                    durable: true,
                },
            },
        }),
    },
]);