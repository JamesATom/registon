// faculty.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { FacultyService } from '../service/faculty.service';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';

@Controller()
export class FacultyEvent {
    constructor(private readonly facultyService: FacultyService) {}

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.CREATE)
    async create(@Payload() createFacultyDto: CreateFacultyDto): Promise<any> {
        return this.facultyService.create(createFacultyDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.GET_ALL)
    async getAll(): Promise<any> {
        return this.facultyService.getAll();
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.GET_ALL_BY_UNIVERSITY)
    async getAllByUniversity(@Payload() { universityId }: { universityId: string }): Promise<any> {
        return this.facultyService.getAllByUniversity(universityId);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.facultyService.getOne(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.UPDATE)
    async update(
        @Payload() { id, updateFacultyDto }: { id: string; updateFacultyDto: UpdateFacultyDto },
    ): Promise<any> {
        return this.facultyService.update(id, updateFacultyDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Faculty.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.facultyService.delete(id);
    }
}
