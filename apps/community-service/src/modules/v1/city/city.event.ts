// city.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CityService } from './service/city.service';

@Controller()
export class CityController {
    constructor(private readonly cityService: CityService) {}
  
    @MessagePattern(MessagePatterns.City.V1.GET_ALL)
    async getAll() {
        return this.cityService.getAll();
    }
}
