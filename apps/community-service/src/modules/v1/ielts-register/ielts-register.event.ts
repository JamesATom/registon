// ielts-register.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { IeltsRegisterService } from './service/ielts-register.service';
import { CreateIeltsRegisterDto } from './dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from './dto/update-ielts-register.dto';

@Controller()
export class IeltsRegisterEvent {
    constructor(private readonly ieltsRegisterService: IeltsRegisterService) {}

    @MessagePattern(MessagePatterns.IeltsRegister.V1.CREATE)
    async create(@Payload() createIeltsRegisterDto: CreateIeltsRegisterDto): Promise<any> {
        return this.ieltsRegisterService.create(createIeltsRegisterDto);
    }

    @MessagePattern(MessagePatterns.IeltsRegister.V1.GET_ALL)
    async getAll(): Promise<any> {
        return this.ieltsRegisterService.getAll();
    }

    @MessagePattern(MessagePatterns.IeltsRegister.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.ieltsRegisterService.getOne(id);
    }

    @MessagePattern(MessagePatterns.IeltsRegister.V1.UPDATE)
    async update(
        @Payload() { id, updateIeltsRegisterDto }: { id: string; updateIeltsRegisterDto: UpdateIeltsRegisterDto },
    ): Promise<any> {
        return this.ieltsRegisterService.update(id, updateIeltsRegisterDto);
    }

    @MessagePattern(MessagePatterns.IeltsRegister.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.ieltsRegisterService.delete(id);
    }

    // @MessagePattern(MessagePatterns.IeltsRegister.V1.REGISTER_FOR_EXAM)
    // async registerForExam(@Payload() { examId, studentId }: { examId: string; studentId: string }): Promise<any> {
    //     return this.ieltsRegisterService.registerForExam(examId, studentId);
    // }
}
