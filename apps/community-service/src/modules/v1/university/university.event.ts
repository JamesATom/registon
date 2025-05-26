//university.event.ts
import { Controller, Logger } from '@nestjs/common';
import { UniversityService } from './university.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class UniversityEvents {
    private readonly logger = new Logger(UniversityEvents.name);

    constructor(private readonly universityService: UniversityService) {}

    @MessagePattern(MessagePatterns.University.V1.CREATE)
    async createUniversity(@Payload() payload: any) {
        const { createUniversityDto, userId } = payload;
        return this.universityService.createUniversity(createUniversityDto, userId);
    }

    @MessagePattern(MessagePatterns.University.V1.FIND_ONE)
    async findUniversityById(@Payload() payload: any) {
        return this.universityService.findUniversityById(payload.id);
    }

    @MessagePattern(MessagePatterns.University.V1.UPDATE)
    async updateUniversity(@Payload() payload: any) {
        const { id, updateData, userId } = payload;
        return this.universityService.updateUniversity(id, updateData, userId);
    }

    @MessagePattern(MessagePatterns.University.V1.DELETE)
    async removeUniversity(@Payload() payload: any) {
        return this.universityService.removeUniversity(payload.id);
    }

    @MessagePattern(MessagePatterns.University.V1.GET_ALL)
    async findAllUniversities(@Payload() payload: any) {
        return this.universityService.findAllUniversities(payload.filters);
    }

    @MessagePattern(MessagePatterns.University.V1.ADD_PROGRAM)
    async addProgram(@Payload() payload: any) {
        return this.universityService.addProgram(payload.programData, payload.userId);
    }

    @MessagePattern(MessagePatterns.University.V1.UPDATE_PROGRAM)
    async updateProgram(@Payload() payload: any) {
        return this.universityService.updateProgram(payload.id, payload.updateData);
    }

    @MessagePattern(MessagePatterns.University.V1.DELETE_PROGRAM)
    async removeProgram(@Payload() payload: any) {
        return this.universityService.removeProgram(payload.id, payload.universityId);
    }
}
