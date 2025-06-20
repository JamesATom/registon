// city.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { City } from '../interfaces/city.interface';

@Injectable()
export class CityRepository extends BaseRepository<City, any> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.CITY);
    }

    async create(createCityDto: any): Promise<City> {
        return super.create(createCityDto);
    }

    async getAll(): Promise<City[]> {
        return super.getAll();
    }
}
