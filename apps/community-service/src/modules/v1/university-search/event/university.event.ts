// university.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { UniversityService } from '../service/university.service';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';

@Controller()
export class UniversityEvent {
    constructor(private readonly universityService: UniversityService) {}

    @MessagePattern(MessagePatterns.UniversitySearch.V1.University.CREATE)
    async create(@Payload() createUniversityDto: CreateUniversityDto): Promise<any> {
        return this.universityService.create(createUniversityDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.University.GET_ALL)
    async getAll(): Promise<any> {
        return this.universityService.getAll();
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.University.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.universityService.getOne(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.University.UPDATE)
    async update(
        @Payload() { id, updateUniversityDto }: { id: string; updateUniversityDto: UpdateUniversityDto },
    ): Promise<any> {
        return this.universityService.update(id, updateUniversityDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.University.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.universityService.delete(id);
    }
}
