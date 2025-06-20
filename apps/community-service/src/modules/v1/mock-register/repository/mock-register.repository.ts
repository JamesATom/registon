// mock-register.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { MockRegistration } from '../interface/mock-register.interface';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';

@Injectable()
export class MockRegisterRepository extends BaseRepository<MockRegistration, CreateMockRegisterDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.MOCK_REGISTRATION);
    }

    async createMockRegistration(dto: CreateMockRegisterDto): Promise<any> {
        return super.create(dto);
    }

    async createMockRegistrationStudent(dto: any): Promise<void> {
        await this.knex(TableNames.MOCK_REGISTRATION_STUDENT).insert(dto).returning('*');
    }

    async getAll(): Promise<any> {
        return super.getAll();
    }

    async getOne(id: string): Promise<any> {
        return super.getOne(id);
    }

    async updateMockRegistration(id: string, dto: any): Promise<any> {
        return super.update(id, dto);
    }

    async updateMockRegistrationStudent(id: string, dto: any): Promise<any> {
        return this.knex(TableNames.MOCK_REGISTRATION_STUDENT).where('id', id).update(dto).returning('*');
    }

    async delete(id: string): Promise<any> {
        return super.delete(id);
    }
}
