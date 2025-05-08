import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagingService } from './messaging.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'MESSAGING_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                    queue: process.env.RABBITMQ_QUEUE || 'microservice_queue',
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [MessagingService],
    exports: [MessagingService],
})
export class MessagingModule {}
