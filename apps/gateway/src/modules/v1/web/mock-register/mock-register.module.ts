// mock-register.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { MockRegisterController } from './controller/mock-register.controller';
import { MockRegisterService } from './service/mock-register.service';

@Module({
    imports: [CommunityService],
    controllers: [MockRegisterController],
    providers: [MockRegisterService],
    exports: [MockRegisterService],
})
export class MockRegisterModule {}
