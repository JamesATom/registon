// job-hunting.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { JobHuntingService } from './service/job-hunting.service';
import { CreateJobHuntingDto } from './dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from './dto/update-job-hunting.dto';

@Controller()
export class JobHuntingEvent {
    constructor(private readonly jobHuntingService: JobHuntingService) {}

    @MessagePattern(MessagePatterns.JobHunting.V1.CREATE)
    async create(@Payload() createJobHuntingDto: CreateJobHuntingDto): Promise<any> {
        return this.jobHuntingService.create(createJobHuntingDto);
    }

    @MessagePattern(MessagePatterns.JobHunting.V1.GET_ALL)
    async getAll(): Promise<any> {
        return this.jobHuntingService.getAll();
    }

    @MessagePattern(MessagePatterns.JobHunting.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.jobHuntingService.getOne(id);
    }

    @MessagePattern(MessagePatterns.JobHunting.V1.UPDATE)
    async update(
        @Payload() { id, updateJobHuntingDto }: { id: string; updateJobHuntingDto: UpdateJobHuntingDto },
    ): Promise<any> {
        return this.jobHuntingService.update(id, updateJobHuntingDto);
    }

    @MessagePattern(MessagePatterns.JobHunting.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.jobHuntingService.delete(id);
    }

}
