import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { RpcErrorInterceptor } from './common/interceptors/rpc-error.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
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
        new ErrorInterceptor(),
        new RpcErrorInterceptor(),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    setupSwaggerDocumentation(app);

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(
            `${process.env.APP_NAME_1 + ' ' + process.env.APP_NAME_2} server is running on port => ${PORT}`,
        );
    });
}

function setupSwaggerDocumentation(app: NestFastifyApplication) {
    const fullConfig = new DocumentBuilder()
        .setTitle(`${process.env.APP_NAME_1} API`)
        .setDescription('Complete API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const fullDocument = SwaggerModule.createDocument(app, fullConfig);

    const adminDocument = { ...fullDocument };
    adminDocument.paths = Object.keys(fullDocument.paths)
        .filter(path => !path.includes('/mobile/'))
        .reduce((paths, path) => {
            paths[path] = fullDocument.paths[path];
            return paths;
        }, {});

    adminDocument.info = {
        ...fullDocument.info,
        title: `${process.env.APP_NAME_1} Admin API`,
        description: 'API documentation for administrative operations',
    };

    SwaggerModule.setup('api/admin', app, adminDocument);

    // For mobile, include both mobile-specific paths and auth paths
    const mobileDocument = { ...fullDocument };
    mobileDocument.paths = Object.keys(fullDocument.paths)
        .filter(
            path =>
                // Include paths with '/mobile/' OR auth-related paths
                path.includes('/mobile/') || path.includes('/auth/'),
        )
        .reduce((paths, path) => {
            paths[path] = fullDocument.paths[path];
            return paths;
        }, {});

    mobileDocument.info = {
        ...fullDocument.info,
        title: `${process.env.APP_NAME_1} Mobile API`,
        description: 'API documentation for mobile client operations',
    };

    SwaggerModule.setup('api/mobile', app, mobileDocument);
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
