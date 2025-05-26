import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class UniversityService {
    private readonly logger = new Logger(UniversityService.name);

    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async createUniversity(universityData: CreateUniversityDto, userId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.University.V1.CREATE, {
                    createUniversityDto: universityData,
                    userId,
                })
                .pipe(timeout(10000)),
        );
    }

    async findUniversityById(id: string) {
        return firstValueFrom(
            this.client.send(MessagePatterns.University.V1.FIND_ONE, { id }).pipe(timeout(10000)),
        );
    }

    async updateUniversity(id: string, updateData: UpdateUniversityDto, userId: string) {
        const payload = {
            id,
            updateData,
            userId,
        };

        return firstValueFrom(
            this.client.send(MessagePatterns.University.V1.UPDATE, payload).pipe(timeout(10000)),
        );
    }

    async removeUniversity(id: string) {
        this.logger.log('Deleting university:', id);
        return firstValueFrom(
            this.client.send(MessagePatterns.University.V1.DELETE, { id }).pipe(timeout(10000)),
        );
    }

    async findAllUniversities(filters: any) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.University.V1.GET_ALL, { filters })
                .pipe(timeout(10000)),
        );
    }

    async addProgram(programData: CreateProgramDto, userId: string) {
        const payload = {
            programData,
            userId,
        };

        return firstValueFrom(
            this.client
                .send(MessagePatterns.University.V1.ADD_PROGRAM, payload)
                .pipe(timeout(10000)),
        );
    }

    async updateProgram(id: string, updateData: UpdateProgramDto) {
        const payload = {
            id,
            updateData,
        };

        return firstValueFrom(
            this.client
                .send(MessagePatterns.University.V1.UPDATE_PROGRAM, payload)
                .pipe(timeout(10000)),
        );
    }
    async removeProgram(id: string, universityId: string) {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.University.V1.DELETE_PROGRAM, { id, universityId })
                .pipe(timeout(10000)),
        );
    }
}
