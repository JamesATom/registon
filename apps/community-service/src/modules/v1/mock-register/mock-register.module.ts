// mock-register.module.ts
import { Module } from '@nestjs/common';
import { MockRegisterRepository } from './repository/mock-register.repository';
import { MockRegisterService } from './service/mock-register.service';
import { MockRegisterEvent } from './mock-register.event';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MockRegisterEvent],
    providers: [MockRegisterService, MockRegisterRepository],
})
export class MockRegisterModule {}
