// event.module.ts
import { Module } from '@nestjs/common';
import { EventRepository } from './repository/event.repository';
import { EventService } from './service/event.service';
import { EventEvent } from './event.event';

@Module({
    controllers: [EventEvent],
    providers: [EventService, EventRepository],
})
export class EventModule {}
