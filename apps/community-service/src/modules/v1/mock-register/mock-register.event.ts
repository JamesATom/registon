// mock-register.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { MockRegisterService } from './service/mock-register.service';
import { CreateMockRegisterDto } from './dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from './dto/update-mock-register.dto';

@Controller()
export class MockRegisterEvent {
    constructor(private readonly mockRegisterService: MockRegisterService) {}

    @MessagePattern(MessagePatterns.MockRegister.V1.CREATE)
    async create(@Payload() createMockRegisterDto: CreateMockRegisterDto): Promise<any> {
        return this.mockRegisterService.create(createMockRegisterDto);
    }

    @MessagePattern(MessagePatterns.MockRegister.V1.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.mockRegisterService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.MockRegister.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.mockRegisterService.getOne(id);
    }

    @MessagePattern(MessagePatterns.MockRegister.V1.UPDATE)
    async update(
        @Payload() { id, updateMockRegisterDto }: { id: string; updateMockRegisterDto: UpdateMockRegisterDto },
    ): Promise<any> {
        return this.mockRegisterService.update(id, updateMockRegisterDto);
    }

    @MessagePattern(MessagePatterns.MockRegister.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.mockRegisterService.delete(id);
    }
}
