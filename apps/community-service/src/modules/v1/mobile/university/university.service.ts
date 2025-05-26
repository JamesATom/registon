import { Injectable } from '@nestjs/common';
import { UniversityRepository } from './university.repository';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class UniversityService {
    constructor(private readonly universityRepository: UniversityRepository) {
        this.universityRepository = universityRepository;
    }

    async createUniversityApply(data: any, userId: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.createUniversityApply(data, userId);
    }

    async findAllUniversities(filters: any): Promise<ServiceResponse<any[]>> {
        return this.universityRepository.findAllUniversities(filters);
    }

    async findUniversityById(id: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.findUniversityById(id);
    }

    async getMyApplies(userId: string): Promise<ServiceResponse<any[]>> {
        return this.universityRepository.getMyApplies(userId);
    }

    async getOneApply(id: string, userId: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.getOneApply(id, userId);
    }
}
