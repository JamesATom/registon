// job-hunting.module.ts
import { Module } from '@nestjs/common';
import { JobHuntingRepository } from './repository/job-hunting.repository';
import { JobHuntingService } from './service/job-hunting.service';
import { JobHuntingEvent } from './job-hunting.event';

@Module({
    controllers: [JobHuntingEvent],
    providers: [JobHuntingService, JobHuntingRepository],
})
export class JobHuntingModule {}
