// city.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
    constructor(private readonly cityRepository: CityRepository) {}

    async create(createCityDto: CreateCityDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'City created successfully',
            data: await this.cityRepository.create(createCityDto),
        };
    }

    async getAll() {
        return {
            statusCode: HttpStatus.OK,
            message: 'Cities retrieved successfully',
            data: await this.cityRepository.getAll(),
        };
    }

    async getOne(id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'City retrieved successfully',
            data: await this.cityRepository.getOne(id),
        };
    }

    async update(id: string, updateCityDto: UpdateCityDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'City updated successfully',
            data: await this.cityRepository.update(id, updateCityDto),
        };
    }

    async delete(id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'City deleted successfully',
            data: await this.cityRepository.delete(id),
        };
    }
}
