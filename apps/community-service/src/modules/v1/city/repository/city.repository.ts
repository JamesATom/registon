// city.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { City, CreateCityDto, UpdateCityDto } from '../interfaces/city.interface';

@Injectable()
export class CityRepository extends BaseRepository<City, CreateCityDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.CITY);
    }

    async create(createCityDto: CreateCityDto): Promise<City> {
        return super.create(createCityDto);
    }

    async getAll(): Promise<City[]> {
        return super.getAll();
    }

    async getOne(id: string): Promise<City | null> {
        return super.getOne(id);
    }

    async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
        return super.update(id, updateCityDto);
    }

    async delete(id: string): Promise<void> {
        return super.delete(id);
    }

    async findByName(name: string): Promise<City | null> {
        const city = await this.knex(this.tableName).where('name', name).first();
        return city || null;
    }

    async searchByName(searchTerm: string): Promise<City[]> {
        return this.knex(this.tableName).where('name', 'ilike', `%${searchTerm}%`).select('*');
    }
}
