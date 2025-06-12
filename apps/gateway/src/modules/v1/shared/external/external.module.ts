// external.module.ts
import { Global, Module } from '@nestjs/common';
import { ExternalService } from './external.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ExternalService],
    exports: [ExternalService],
})
export class ExternalModule {}
