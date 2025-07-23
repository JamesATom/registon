// poll.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { PollController } from './controller/poll.controller';
import { PollService } from './service/poll.service';

@Module({
    imports: [CommunityService],
    controllers: [PollController],
    providers: [PollService],
    exports: [PollService],
})
export class PollModule {}
