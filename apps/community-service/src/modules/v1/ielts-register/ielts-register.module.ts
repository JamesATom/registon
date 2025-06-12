// ielts-register.module.ts
import { Module } from '@nestjs/common';
import { IeltsRegisterRepository } from './repository/ielts-register.repository';
import { IeltsRegisterService } from './service/ielts-register.service';
import { IeltsRegisterEvent } from './ielts-register.event';

@Module({
    controllers: [IeltsRegisterEvent],
    providers: [IeltsRegisterService, IeltsRegisterRepository],
})
export class IeltsRegisterModule {}
