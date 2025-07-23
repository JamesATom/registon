import { Module } from '@nestjs/common';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableService } from './service/timetable.service';
import { CalendarService } from './service/calendar.service';
import { ReservationService } from './service/reservation.service';
import { TimetableEvent } from './event/timetable.event';
import { CalendarEvent } from './event/calendar.event';
import { ReservationEvent } from './event/reservation.event';

@Module({
    controllers: [TimetableEvent, CalendarEvent, ReservationEvent],
    providers: [
        TimetableService,
        CalendarService,
        ReservationService,
        TimetableRepository,
    ],
})
export class TimetableModule {}
