// city.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class CityService {
    constructor(private readonly cityRepository: CityRepository) {}

    async getAll() {
        return {
            statusCode: HttpStatus.OK,
            message: 'Cities retrieved successfully',
            data: await this.cityRepository.getAll(),
        }
    }
}
