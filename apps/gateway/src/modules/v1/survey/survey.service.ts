// survey.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    create(createSurveyDto: CreateSurveyDto) {
        return this.client.send(MessagePatterns.Survey.V1.GET_ALL, {}).toPromise();
    }

    findAll() {
        return this.client.send(MessagePatterns.Survey.V1.GET_ALL, {}).toPromise();
    }

    findOne(id: number) {
        return `This action returns a #${id} survey`;
    }

    update(id: number, updateSurveyDto: UpdateSurveyDto) {
        return `This action updates a #${id} survey`;
    }

    remove(id: number) {
        return `This action removes a #${id} survey`;
    }
}
