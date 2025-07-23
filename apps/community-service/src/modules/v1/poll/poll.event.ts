// poll.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { PollService } from './service/poll.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { SubmitPollDto } from './dto/submit-poll.dto';

@Controller()
export class PollEvent {
    constructor(private readonly pollService: PollService) {}

    @MessagePattern(MessagePatterns.Poll.V1.CREATE)
    async create(@Payload() createPollDto: CreatePollDto) {
        return this.pollService.create(createPollDto);
    }

    @MessagePattern(MessagePatterns.Poll.V1.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }) {
        return this.pollService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.Poll.V1.GET_ONE)
    async getOne(@Payload() id: string) {
        return this.pollService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Poll.V1.UPDATE)
    async update(@Payload() { id, updatePollDto }: { id: string; updatePollDto: UpdatePollDto }) {
        return this.pollService.update(id, updatePollDto);
    }

    @MessagePattern(MessagePatterns.Poll.V1.DELETE)
    async delete(@Payload() id: string) {
        return this.pollService.delete(id);
    }
}
