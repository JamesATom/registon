// survey.service.ts
import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
	constructor(private readonly externalService: ExternalService) {}

    create(createSurveyDto: CreateSurveyDto) {
        return 'This action adds a new survey';
    }

    findAll() {
		this.externalService.getBranchList();
        return `This action returns all survey`;
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
