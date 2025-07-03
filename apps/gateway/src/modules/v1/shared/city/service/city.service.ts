// city.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.GET_ALL, paginationParams || {})
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error fetching cities:', error);
                    throw new Error('Failed to fetch cities');
                })
            ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.GET_ONE, id)
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error(`Error fetching city with id ${id}:`, error);
                    throw new Error('Failed to fetch city');
                })
            ),
        );
    }

    async create(createCityDto: CreateCityDto): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.CREATE, createCityDto)
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error creating city:', error);
                    throw new Error('Failed to create city');
                })
            ),
        );
    }

    async update(id: string, updateCityDto: UpdateCityDto): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.UPDATE, { id, updateCityDto })
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error(`Error updating city with id ${id}:`, error);
                    throw new Error('Failed to update city');
                })
            ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.DELETE, id)
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error(`Error deleting city with id ${id}:`, error);
                    throw new Error('Failed to delete city');
                })
            ),
        );
    }
}
