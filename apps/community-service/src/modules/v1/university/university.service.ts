import { Injectable } from '@nestjs/common';
import { UniversityRepository } from './university.repository';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class UniversityService {
    constructor(private readonly universityRepository: UniversityRepository) {
        this.universityRepository = universityRepository;
    }

    async createUniversity(universityData: any, userId: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.createUniversity(universityData, userId);
    }

    async findUniversityById(id: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.findUniversityById(id);
    }

    async updateUniversity(
        id: string,
        updateData: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        return this.universityRepository.updateUniversity(id, updateData, userId);
    }

    async removeUniversity(id: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.removeUniversity(id);
    }

    async findAllUniversities(filters: any): Promise<ServiceResponse<any[]>> {
        return this.universityRepository.findAllUniversities(filters);
    }

    async addProgram(programData: any, userId: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.addProgram(programData, userId);
    }

    async updateProgram(id: string, updateData: any): Promise<ServiceResponse<any>> {
        return this.universityRepository.updateProgram(id, updateData);
    }

    async removeProgram(id: string, universityId: string): Promise<ServiceResponse<any>> {
        return this.universityRepository.removeProgram(id, universityId);
    }
}
