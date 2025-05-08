// app.module.ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/v1/auth/auth.module';
import { StoriesModule } from './modules/v1/stories/stories.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { SharedModule } from './modules/shared/shared.module';
import { HealthModule } from './modules/health/health.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MicroserviceLoggerInterceptor } from './interceptors/microservice-logger.interceptor';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/registan',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    SharedModule,
    MessagingModule,
    StoriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MicroserviceLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
