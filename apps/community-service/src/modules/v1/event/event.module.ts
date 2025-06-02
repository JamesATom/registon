// event.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema';
import { EventRepository } from './repository/event.repository';
import { EventService } from './service/event.service';
import { EventEvent } from './event.event';

@Module({
    imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
    controllers: [EventEvent],
    providers: [EventService, EventRepository],
})
export class EventModule {}
