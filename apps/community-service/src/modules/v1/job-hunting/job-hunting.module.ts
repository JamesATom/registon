// job-hunting.module.ts
import { Module } from '@nestjs/common';
import { JobHuntingRepository } from './repository/job-hunting.repository';
import { JobHuntingService } from './service/job-hunting.service';
import { CompanyService } from './service/company.service';
import { JobHuntingEvent } from './event/job-hunting.event';
import { CompanyEvent } from './event/company.event';

@Module({
    controllers: [JobHuntingEvent, CompanyEvent],
    providers: [JobHuntingService, CompanyService, JobHuntingRepository],
})
export class JobHuntingModule {}
