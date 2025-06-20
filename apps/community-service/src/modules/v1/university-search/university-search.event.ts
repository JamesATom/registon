// university-search.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { UniversitySearchService } from './service/university-search.service';
import { CreateUniversitySearchDto } from './dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from './dto/update-university-search.dto';
import { FilterUniversitySearchDto } from './dto/filter-university-search.dto';

@Controller()
export class UniversitySearchEvent {
    constructor(private readonly universitySearchService: UniversitySearchService) {}

    @MessagePattern(MessagePatterns.UniversitySearch.V1.CREATE)
    async create(@Payload() createUniversitySearchDto: CreateUniversitySearchDto): Promise<any> {
        return this.universitySearchService.create(createUniversitySearchDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.GET_ALL)
    async getAll(): Promise<any> {
        return this.universitySearchService.getAll();
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.universitySearchService.getOne(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.UPDATE)
    async update(
        @Payload()
        { id, updateUniversitySearchDto }: { id: string; updateUniversitySearchDto: UpdateUniversitySearchDto },
    ): Promise<any> {
        return this.universitySearchService.update(id, updateUniversitySearchDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.universitySearchService.delete(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.FILTER)
    async filter(@Payload() filterUniversitySearchDto: FilterUniversitySearchDto): Promise<any> {
        return this.universitySearchService.filter(filterUniversitySearchDto);
    }
}
