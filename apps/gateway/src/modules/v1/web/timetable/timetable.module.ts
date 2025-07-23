import { Module } from '@nestjs/common';
import { TimetableController } from './controller/timetable.controller';
import { CalendarController } from './controller/calendar.controller';
import { ReservationController } from './controller/reservation.controller';
import { TimetableService } from './service/timetable.service';
import { CalendarService } from './service/calendar.service';
import { ReservationService } from './service/reservation.service';
import { CommunityService } from 'src/microservices/community.service';

@Module({
    imports: [CommunityService],
    controllers: [TimetableController, CalendarController, ReservationController],
    providers: [TimetableService, CalendarService, ReservationService],
})
export class TimetableModule {}
