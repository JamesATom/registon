// event.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { EventService } from './service/event.service';
import { EventController } from './event.controller';

@Module({
    imports: [CommunityService],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
