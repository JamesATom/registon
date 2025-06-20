// city.module.ts
import { Module } from '@nestjs/common';
import { CityRepository } from './repository/city.repository';
import { CityService } from './service/city.service';
import { CityController } from './city.event';

@Module({
    imports: [],
    controllers: [CityController],
    providers: [CityService, CityRepository],
})
export class CityModule {}
