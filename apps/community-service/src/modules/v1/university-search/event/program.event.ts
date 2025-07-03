// program.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { ProgramService } from '../service/program.service';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';

@Controller()
export class ProgramEvent {
    constructor(private readonly programService: ProgramService) {}

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.CREATE)
    async create(@Payload() createProgramDto: CreateProgramDto): Promise<any> {
        return this.programService.create(createProgramDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.GET_ALL)
    async getAll(@Payload() payload?: { page?: number; limit?: number }): Promise<any> {
        return this.programService.getAll(payload);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.GET_ALL_BY_UNIVERSITY)
    async getAllByUniversity(@Payload() { universityId }: { universityId: string }): Promise<any> {
        return this.programService.getAllByUniversity(universityId);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.GET_ALL_BY_FACULTY)
    async getAllByFaculty(@Payload() { facultyId }: { facultyId: string }): Promise<any> {
        return this.programService.getAllByFaculty(facultyId);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.programService.getOne(id);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.UPDATE)
    async update(
        @Payload() { id, updateProgramDto }: { id: string; updateProgramDto: UpdateProgramDto },
    ): Promise<any> {
        return this.programService.update(id, updateProgramDto);
    }

    @MessagePattern(MessagePatterns.UniversitySearch.V1.Program.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.programService.delete(id);
    }
}
