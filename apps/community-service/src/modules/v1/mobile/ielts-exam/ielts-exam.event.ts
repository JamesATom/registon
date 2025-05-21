import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MobileIeltsExamService } from './ielts-exam.service';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class MobileIeltsExamEvent {
    constructor(private readonly ieltsExamService: MobileIeltsExamService) {}

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ALL_IELTS_EXAM_DAYS)
    async getAllIeltExamDays(@Payload() data: { city: string }) {
        return this.ieltsExamService.getAllIeltsExamDays(data.city);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ONE_EXAM)
    async getExamById(@Payload() data: { id: string }) {
        return this.ieltsExamService.findExamById(data.id);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.REGISTER_FOR_EXAM)
    async registerForExam(@Payload() data: { studentInformation: any; studentId: string }) {
        return this.ieltsExamService.registerForExam(data.studentInformation, data.studentId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_EXAM_REGISTRATION)
    async getRegistredExams(@Payload() data: { studentId: string }) {
        return this.ieltsExamService.getRegistredExams(data.studentId);
    }
}
