import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MobileIeltsExamService } from './ielts-exam.service';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Controller()
export class MobileIeltsExamEvent {
    constructor(private readonly ieltsExamService: MobileIeltsExamService) {}

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ALL_IELTS_EXAM_DAYS)
    async getAllIeltExamDays(@Payload() data: { location: string }) {
        return this.ieltsExamService.getAllIeltsExamDays(data.location);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.REGISTER_FOR_EXAM)
    async registerForExam(@Payload() data: { data: any }) {
        return this.ieltsExamService.registerForExam(
            data.data.examId,
            data.data.studentInformation,
        );
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_EXAM_REGISTRATION)
    async getRegistredExams(@Payload() data: { studentId: string }) {
        return this.ieltsExamService.getRegistredExams(data.studentId);
    }

    @MessagePattern(MessagePatterns.Mobile.V1.GET_ONE_EXAM)
    async getExamById(@Payload() data: { id: string }) {
        return this.ieltsExamService.findExamById(data.id);
    }
}
