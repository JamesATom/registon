// poll.module.ts
import { Module } from '@nestjs/common';
import { PollService } from './service/poll.service';
import { PollEvent } from './poll.event';
import { PollRepository } from './repository/poll.repository';

@Module({
    controllers: [PollEvent],
    providers: [PollService, PollRepository],
})
export class PollModule {}
