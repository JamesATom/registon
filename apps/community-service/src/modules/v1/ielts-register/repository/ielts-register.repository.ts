// ielts-register.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { IeltsExam } from '../interface/ielts-register.interface';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';

@Injectable()
export class IeltsRegisterRepository extends BaseRepository<IeltsExam, CreateIeltsRegisterDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.IELTS_EXAM);
    }

    async createIeltsExam(dto: CreateIeltsRegisterDto): Promise<any> {
        return super.create(dto);
    }

    async createIeltsRegistrationStudent(dto: any): Promise<void> {
        await this.knex(TableNames.IELTS_REGISTRATION_STUDENT).insert(dto).returning('*');
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return super.getAll(paginationParams);
    }

    async getOne(id: string): Promise<any> {
        return super.getOne(id);
    }

    async updateIeltsExam(id: string, dto: any): Promise<any> {
        return super.update(id, dto);
    }

    async updateIeltsRegistrationStudent(id: string, dto: any): Promise<any> {
        return this.knex(TableNames.IELTS_REGISTRATION_STUDENT).where('examId', id).update(dto).returning('*');
    }

    async delete(id: string): Promise<any> {
        return super.delete(id);
    }
}
