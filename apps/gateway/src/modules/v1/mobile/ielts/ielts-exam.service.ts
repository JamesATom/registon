import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { firstValueFrom, timeout } from 'rxjs';
import { CreateIeltsRegistrationDto } from './dto/create-ielts-exam.dto';

@Injectable()
export class IeltsExamService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async getAllIeltsExamDays(city: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ALL_IELTS_EXAM_DAYS, {
                    city,
                })
                .pipe(timeout(10000)),
        );
    }

    async findExamById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Mobile.V1.GET_ONE_EXAM, { id }).pipe(timeout(10000)),
        );
    }

    async registerForExam(body: CreateIeltsRegistrationDto, studentId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.REGISTER_FOR_EXAM, {
                    studentInformation: body,
                    studentId,
                })
                .pipe(timeout(10000)),
        );
    }

    async getRegistredExams(studentId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_REGISTRATED_EXAMS, { studentId })
                .pipe(timeout(10000)),
        );
    }
}
