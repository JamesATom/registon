//university.event.ts
import { Controller, Logger } from '@nestjs/common';
import { UniversityService } from './university.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class UniversityEvents {
    constructor(private readonly universityService: UniversityService) {}

    @MessagePattern(MessagePatterns.Mobile.V1.CREATE_UNIVERSITY_APPLY)
    async createUniversity(@Payload() payload: any) {
        console.log('payload', payload);
        const { data, userId } = payload;
        return this.universityService.createUniversityApply(data, userId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ALL_UNIVERSITIES)
    async findAllUniversities(@Payload() payload: any) {
        return this.universityService.findAllUniversities(payload.filters);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ONE_UNIVERSITY)
    async findUniversityById(@Payload() payload: any) {
        return this.universityService.findUniversityById(payload.id);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_MY_APPLIES)
    async getMyApplies(@Payload() payload: any) {
        return this.universityService.getMyApplies(payload.userId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ONE_MY_APPLY)
    async getOneApply(@Payload() payload: any) {
        return this.universityService.getOneApply(payload.id, payload.userId);
    }
}
