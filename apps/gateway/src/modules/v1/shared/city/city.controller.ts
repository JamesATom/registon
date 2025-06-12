// city.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll } from 'src/common/swagger/common-swagger';
import { CityService } from './service/city.service';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
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
