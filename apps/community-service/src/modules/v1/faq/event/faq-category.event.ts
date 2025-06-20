// faq-category.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { FaqCategoryService } from '../service/faq-category.service';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';

@Controller()
export class FaqCategoryEvent {
    constructor(private readonly faqCategoryService: FaqCategoryService) {}

    @MessagePattern(MessagePatterns.FaqCategory.V1.CREATE)
    async create(@Payload() createFaqCategoryDto: CreateFaqCategoryDto): Promise<any> {
        return this.faqCategoryService.create(createFaqCategoryDto);
    }

    @MessagePattern(MessagePatterns.FaqCategory.V1.GET_ALL)
    async getAll(): Promise<any> {
        return this.faqCategoryService.getAll();
    }

    @MessagePattern(MessagePatterns.FaqCategory.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.faqCategoryService.getOne(id);
    }

    @MessagePattern(MessagePatterns.FaqCategory.V1.UPDATE)
    async update(@Payload() { id, updateFaqCategoryDto }: { id: string, updateFaqCategoryDto: UpdateFaqCategoryDto }): Promise<any> {
        return this.faqCategoryService.update(id, updateFaqCategoryDto);
    }

    @MessagePattern(MessagePatterns.FaqCategory.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.faqCategoryService.delete(id);
    }
}
