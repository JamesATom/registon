import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { JobHuntingController } from './controller/job-hunting.controller';
import { JobHuntingService } from './service/job-hunting.service';

@Module({
    imports: [CommunityService],
    controllers: [JobHuntingController],
    providers: [JobHuntingService],
    exports: [JobHuntingService],
})
export class JobHuntingModule {}
