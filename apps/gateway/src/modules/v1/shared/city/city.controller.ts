// city.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiGetAll } from 'src/common/swagger/common-swagger';
import { CityService } from './service/city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

	@Get()
	@ApiGetAll('Cities', CommonEntity)
	@ApiOkResponse({ type: [CommonEntity] })
    async findAll() {
        return this.cityService.getAll();
    }
}
