// city.module.ts
import { Global, Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { CityService } from './service/city.service';
import { CityController } from './city.controller';

@Global()
@Module({
    imports: [CommunityService],
    controllers: [CityController],
    providers: [CityService],
    exports: [CityService],
})
export class CityModule {}
