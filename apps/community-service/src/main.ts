// community-service.main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_COMMUNITY_SERVICE_QUEUE,
            queueOptions: {
                durable: true,
            },
        },
    });

    await app.startAllMicroservices();

    const PORT = process.env.PORT;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(`Microservice is running on port => ${PORT}`);
        console.log(`RabbitMQ connected to queue: ${process.env.RABBITMQ_COMMUNITY_SERVICE_QUEUE}`);
    });
}

bootstrap().catch((error) => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
