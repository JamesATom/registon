// ielts-register.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { IeltsRegisterController } from './controller/ielts-register.controller';
import { IeltsRegisterService } from './service/ielts-register.service';

@Module({
    imports: [CommunityService],
    controllers: [IeltsRegisterController],
    providers: [IeltsRegisterService],
    exports: [IeltsRegisterService],
})
export class IeltsRegisterModule {}
