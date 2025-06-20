// city-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { CityService } from 'src/modules/v1/shared/city/service/city.service';

@Injectable()
export class CityValidationPipe implements PipeTransform {
    constructor(private readonly cityService: CityService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const { city, ...newValue } = value;

        if (!value || !city) {
            return value;
        }

        const citiesResponse = await this.cityService.getAll();

        if (!citiesResponse?.data || !Array.isArray(citiesResponse.data)) {
            throw new HttpException(
                'Failed to fetch city list',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        const foundCity = citiesResponse.data.find(
            city => city.id == value.city
        );

        if (!foundCity) {
            throw new HttpException(
                'City not found',
                HttpStatus.BAD_REQUEST
            );
        }

        return { ...newValue, cityId: foundCity.id };
    }
}
