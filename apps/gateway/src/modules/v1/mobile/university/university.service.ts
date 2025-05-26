import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateUniversityApplyDto } from './dto/create-universityApply.dto';

@Injectable()
export class UniversityService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async createUniversityApply(data: CreateUniversityApplyDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.CREATE_UNIVERSITY_APPLY, {
                    data,
                    userId,
                })
                .pipe(timeout(10000)),
        );
    }

    async getMyApplies(userId: string) {
        const payload = {
            userId,
        };

        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_MY_APPLIES, payload)
                .pipe(timeout(10000)),
        );
    }

    async getOneApply(id: string, userId: string) {
        const payload = {
            id,
            userId,
        };

        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ONE_MY_APPLY, payload)
                .pipe(timeout(10000)),
        );
    }

    async findAllUniversities(filters: any) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ALL_UNIVERSITIES, { filters })
                .pipe(timeout(10000)),
        );
    }

    async findUniversityById(id: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_ONE_UNIVERSITY, { id })
                .pipe(timeout(10000)),
        );
    }
}
