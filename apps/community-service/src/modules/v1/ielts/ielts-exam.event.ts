import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IeltsExamService } from './ielts-exam.service';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class IeltsExamEvents {
    constructor(private readonly ieltsExamService: IeltsExamService) {}

    @MessagePattern(MessagePatterns.IeltsExam.V1.CREATE)
    async createExam(@Payload() payload: { data: any; userId: string }) {
        return this.ieltsExamService.createExam(payload.data, payload.userId);
    }

    @MessagePattern(MessagePatterns.IeltsExam.V1.FIND_ONE)
    async findExamById(@Payload() payload: { id: string }) {
        return this.ieltsExamService.findExamById(payload.id);
    }

    @MessagePattern(MessagePatterns.IeltsExam.V1.UPDATE)
    async updateExam(@Payload() payload: { updateData: any; id: string; userId: string }) {
        return this.ieltsExamService.updateExam(payload.updateData, payload.id, payload.userId);
    }

    @MessagePattern(MessagePatterns.IeltsExam.V1.DELETE)
    async deleteExam(@Payload() payload: { id: string; userId: string }) {
        return this.ieltsExamService.deleteExam(payload.id, payload.userId);
    }

    @MessagePattern(MessagePatterns.IeltsExam.V1.GET_ALL)
    async findAllExams(@Payload() payload: { filterDto: any }) {
        return this.ieltsExamService.findAllExams(payload.filterDto);
    }
}
