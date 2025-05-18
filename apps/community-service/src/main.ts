// community-service.main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });

    app.useGlobalFilters(new RpcExceptionFilter());

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
        console.log(`Community service is running on port => ${PORT}`);
        console.log(`RabbitMQ connected to queue: ${process.env.RABBITMQ_COMMUNITY_SERVICE_QUEUE}`);
    });
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
