// external.module.ts
import { Module } from '@nestjs/common';
import { ExternalService } from './external.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ExternalService],
    exports: [ExternalService],
})
export class ExternalModule {}
