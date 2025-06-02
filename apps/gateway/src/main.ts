// main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { RpcErrorInterceptor } from './common/interceptors/rpc-error.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api/',
        defaultVersion: 'v1',
    });

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalInterceptors(new LoggingInterceptor(), new RpcErrorInterceptor());

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
            `${process.env.APP_NAME_1 ?? 'App'} ${process.env.APP_NAME_2 ?? ''} server is running on port => ${PORT}`,
        );
    });
}

function setupSwaggerDocumentation(app: NestFastifyApplication) {
    const fullConfig = new DocumentBuilder()
        .setTitle(`${process.env.APP_NAME_1 ?? 'App'} API`)
        .setDescription('Complete API documentation')
        .setVersion('1.0')
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

    const fullDocument = SwaggerModule.createDocument(app, fullConfig);

    const adminDocument = {
        ...fullDocument,
        paths: Object.fromEntries(
            Object.entries(fullDocument.paths).filter(([path]) => !path.includes('/mobile/')),
        ),
        info: {
            ...fullDocument.info,
            title: `${process.env.APP_NAME_1 ?? 'App'} Admin API`,
            description: 'API documentation for administrative operations',
        },
    };

    SwaggerModule.setup('api/admin', app, adminDocument);

    const mobileDocument = {
        ...fullDocument,
        paths: Object.fromEntries(
            Object.entries(fullDocument.paths).filter(
                ([path]) => path.includes('/mobile/') || path.includes('/auth/'),
            ),
        ),
        info: {
            ...fullDocument.info,
            title: `${process.env.APP_NAME_1 ?? 'App'} Mobile API`,
            description: 'API documentation for mobile client operations',
        },
    };

    SwaggerModule.setup('api/mobile', app, mobileDocument);
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
