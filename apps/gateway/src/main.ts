// main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { RpcErrorInterceptor } from './common/interceptors/rpc-error.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exception/all-exception.filter';
import { AppModule } from './app.module';
import { AuthModule } from './modules/v1/shared/auth/auth.module';
import { BranchModule } from './modules/v1/shared/branch/branch.module';
import { CityModule } from './modules/v1/shared/city/city.module';
import { CourseModule } from './modules/v1/shared/course/course.module';

import { SurveyModule as WebSurveyModule } from './modules/v1/web/survey/survey.module';
import { EventModule as WebEventModule } from './modules/v1/web/event/event.module';
import { StoryModule as WebStoryModule } from './modules/v1/web/story/story.module';
import { MockRegisterModule as WebMockRegisterModule } from './modules/v1/web/mock-register/mock-register.module';
import { IeltsRegisterModule as WebIeltsRegisterModule } from './modules/v1/web/ielts-register/ielts-register.module';
import { JobHuntingModule as WebJobHuntingModule } from './modules/v1/web/job-hunting/job-hunting.module';
import { UniversitySearchModule as WebUniversitySearchModule } from './modules/v1/web/university-search/university-search.module';

// import { SurveyModule as MobileSurveyModule } from './modules/v1/mobile/survey/survey.module';
// import { StoryModule as MobileStoryModule } from './modules/v1/mobile/story/story.module';
// import { EventModule as MobileEventModule } from './modules/v1/mobile/event/event.module';
// import { MockRegisterModule as MobileMockRegisterModule } from './modules/v1/mobile/mock-register/mock-register.module';
// import { IeltsRegisterModule as MobileIeltsRegisterModule } from './modules/v1/mobile/ielts-register/ielts-register.module';
// import { JobHuntingModule as MobileJobHuntingModule } from './modules/v1/mobile/job-hunting/job-hunting.module';

dotenv.config();

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

    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

    app.useGlobalInterceptors(new LoggingInterceptor(), new RpcErrorInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    const APP_NAME_1 = process.env.APP_NAME_1 || 'MyApp';

    const webConfig = new DocumentBuilder()
        .setTitle(`${APP_NAME_1} Web API`)
        .setDescription(`The ${APP_NAME_1} Web API documentation`)
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

    const webDocument = SwaggerModule.createDocument(app, webConfig, {
        include: [
            WebSurveyModule,
            WebEventModule,
            WebStoryModule,
            WebMockRegisterModule,
            WebIeltsRegisterModule,
            WebJobHuntingModule,
            WebUniversitySearchModule,
            
            AuthModule,
            BranchModule,
            CityModule,
            CourseModule
        ],
    });

    SwaggerModule.setup('api/docs/web', app, webDocument);

    const mobileConfig = new DocumentBuilder()
        .setTitle(`${APP_NAME_1} Mobile API`)
        .setDescription(`The ${APP_NAME_1} Mobile API documentation`)
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

    const mobileDocument = SwaggerModule.createDocument(app, mobileConfig, {
        include: [
            // MobileSurveyModule,
            // MobileEventModule,
            // MobileMockRegisterModule,
            // MobileIeltsRegisterModule,
            // MobileJobHuntingModule,
            
            AuthModule,
            BranchModule,
            CityModule,
            CourseModule
        ],
    });
    
    SwaggerModule.setup('api/docs/mobile', app, mobileDocument);

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, '0.0.0.0', () => {
        console.log(
            `${process.env.APP_NAME_1 ?? 'App'} ${process.env.APP_NAME_2 ?? ''} server is running on port => ${PORT}`,
        );
    });
}

bootstrap().catch(error => {
    console.error('Failed to start the application:', error);
    process.exit(1);
});
