// main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { RpcErrorInterceptor } from './common/interceptors/rpc-error.interceptor';
import { ErrorInterceptor } from './common/interceptors';
import { AppModule } from './app.module';

async function bootstrap() {
    const fastifyAdapter = new FastifyAdapter({
        bodyLimit: 10 * 1024 * 1024,
    });

    const fastifyMultipart = require('@fastify/multipart');
    fastifyAdapter.register(fastifyMultipart, {
        limits: {
            fileSize: 100 * 1024 * 1024, // 10MB
        },
    });

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api/',
        defaultVersion: '1',
    });

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });

    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        // new ErrorInterceptor(),
        // new RpcErrorInterceptor(),
    );

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle(`${process.env.APP_NAME_1} API`)
        .setDescription(`The ${process.env.APP_NAME_1} API description`)
        .setVersion('1.0')
        .addTag(`${process.env.APP_NAME_1}`)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'JWT',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app as any, document);

    const PORT = process.env.PORT;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(
            `${process.env.APP_NAME_1 + ' ' + process.env.APP_NAME_2} server is running on port => ${PORT}`,
        );
    });
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
