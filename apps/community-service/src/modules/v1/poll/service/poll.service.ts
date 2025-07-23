// poll.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { PollRepository } from '../repository/poll.repository';
import { CreatePollDto } from '../dto/create-poll.dto';
import { UpdatePollDto } from '../dto/update-poll.dto';

@Injectable()
export class PollService {
    constructor(private readonly pollRepository: PollRepository) {}

    async create(createPollDto: CreatePollDto): Promise<any> {
        const createdPoll = await this.pollRepository.createPoll(createPollDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Poll created successfully',
            data: createdPoll || {},
        };
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Polls retrieved successfully',
            data: (await this.pollRepository.getPolls(paginationParams)) || {},
        };
    }

    async getOne(id: string): Promise<any> {
        const poll = await this.pollRepository.getPollWithQuestions(id);

        if (!poll) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Poll with ID ${id} not found`,
                data: {},
            };
        }

        return {
            statusCode: HttpStatus.OK,
            message: `Poll with ID ${id} retrieved successfully`,
            data: poll || {},
        };
    }

    async update(id: string, updatePollDto: UpdatePollDto): Promise<any> {
        const poll = await this.pollRepository.getOne(id);

        if (!poll) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Poll with ID ${id} not found`,
                data: {},
            };
        }

        const updatedPoll = await this.pollRepository.updatePoll(id, updatePollDto);

        return {
            statusCode: HttpStatus.OK,
            message: `Poll with ID ${id} updated successfully`,
            data: updatedPoll || {},
        };
    }

    async delete(id: string): Promise<any> {
        const poll = await this.pollRepository.getOne(id);

        if (!poll) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Poll with ID ${id} not found`,
                data: {},
            };
        }

        await this.pollRepository.deletePoll(id);

        return {
            statusCode: HttpStatus.OK,
            message: `Poll with ID ${id} deleted successfully`,
            data: {},
        };
    }
}
