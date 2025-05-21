import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { firstValueFrom, timeout } from 'rxjs';
import { UpdateIeltsExamDto } from './dto/update-ielts-exam.dto';
import { FilterIeltsExamsDto } from './dto/filter-ielts-registrations.dto';

@Injectable()
export class IeltsExamService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async getAllIeltsExamDays(location: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ALL_IELTS_EXAM_DAYS, {
                    location,
                })
                .pipe(timeout(10000)),
        );
    }

    async findExamById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.Mobile.V1.GET_ONE_EXAM, { id }).pipe(timeout(10000)),
        );
    }

    async getAllExams(filterDto: FilterIeltsExamsDto) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsExam.V1.GET_ALL, { filterDto: filterDto })
                .pipe(timeout(10000)),
        );
    }

    async updateExam(id: string, updateExamDto: UpdateIeltsExamDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsExam.V1.UPDATE, {
                    updateData: updateExamDto,
                    id,
                    userId,
                })
                .pipe(timeout(10000)),
        );
    }

    async deleteExam(id: string, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsExam.V1.DELETE, {
                    id,
                    userId,
                })
                .pipe(timeout(10000)),
        );
    }
}
