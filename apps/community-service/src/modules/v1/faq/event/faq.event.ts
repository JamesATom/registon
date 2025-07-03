// faq.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { FaqService } from '../service/faq.service';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@Controller()
export class FaqEvent {
    constructor(private readonly faqService: FaqService) {}

    @MessagePattern(MessagePatterns.Faq.V1.CREATE)
    async create(@Payload() createFaqDto: CreateFaqDto): Promise<any> {
        return this.faqService.create(createFaqDto);
    }

    @MessagePattern(MessagePatterns.Faq.V1.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.faqService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.Faq.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.faqService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Faq.V1.UPDATE)
    async update(@Payload() { id, updateFaqDto }: { id: string; updateFaqDto: UpdateFaqDto }): Promise<any> {
        return this.faqService.update(id, updateFaqDto);
    }

    @MessagePattern(MessagePatterns.Faq.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.faqService.delete(id);
    }
}
