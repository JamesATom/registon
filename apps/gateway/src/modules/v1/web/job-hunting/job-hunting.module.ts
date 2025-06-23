import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { JobHuntingController } from './controller/job-hunting.controller';
import { JobHuntingService } from './service/job-hunting.service';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';

@Module({
    imports: [CommunityService],
    controllers: [JobHuntingController, CompanyController],
    providers: [JobHuntingService, CompanyService],
    exports: [JobHuntingService, CompanyService],
})
export class JobHuntingModule {}
