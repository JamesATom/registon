// city.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CityService } from './service/city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller()
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @MessagePattern(MessagePatterns.City.V1.CREATE)
    async create(@Payload() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @MessagePattern(MessagePatterns.City.V1.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }) {
        return this.cityService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.City.V1.GET_ONE)
    async getOne(@Payload() id: string) {
        return this.cityService.getOne(id);
    }

    @MessagePattern(MessagePatterns.City.V1.UPDATE)
    async update(@Payload() payload: { id: string; updateCityDto: UpdateCityDto }) {
        return this.cityService.update(payload.id, payload.updateCityDto);
    }

    @MessagePattern(MessagePatterns.City.V1.DELETE)
    async delete(@Payload() id: string) {
        return this.cityService.delete(id);
    }
}
