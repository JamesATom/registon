// faq.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { FaqRepository } from '../repository/faq.repository';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@Injectable()
export class FaqService {
    constructor(private readonly faqRepository: FaqRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    private async validateCategory(categoryId: string) {
        if (!categoryId) return null;

        try {
            await this.faqRepository.getCategoryById(categoryId);
            return null;
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Category with ID ${categoryId} does not exist`, null);
        }
    }

    async create(createFaqDto: CreateFaqDto): Promise<any> {
        if (createFaqDto.categoryId) {
            const categoryValidationError = await this.validateCategory(createFaqDto.categoryId);
            if (categoryValidationError) return categoryValidationError;
        }

        const createdFaq = await this.faqRepository.createFaq(createFaqDto);
        return this.formatResponse(HttpStatus.CREATED, 'FAQ created successfully', createdFaq);
    }

    async getAll(): Promise<any> {
        const data = await this.faqRepository.getAllFaqsWithCategory();
        return this.formatResponse(HttpStatus.OK, 'FAQs retrieved successfully', data);
    }

    async getOne(id: string): Promise<any> {
        const data = await this.faqRepository.getFaqWithCategory(id);

        if (!data) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `FAQ with ID ${id} not found`, null);
        }

        return this.formatResponse(HttpStatus.OK, `FAQ with ID ${id} retrieved successfully`, data);
    }

    async update(id: string, updateFaqDto: UpdateFaqDto): Promise<any> {
        const existingFaq = await this.faqRepository.getFaqById(id);

        if (!existingFaq) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `FAQ with ID ${id} not found`, null);
        }

        if (updateFaqDto.categoryId) {
            const categoryValidationError = await this.validateCategory(updateFaqDto.categoryId);
            if (categoryValidationError) return categoryValidationError;
        }

        const updatedFaq = await this.faqRepository.updateFaq(id, updateFaqDto);
        return this.formatResponse(HttpStatus.OK, `FAQ with ID ${id} updated successfully`, updatedFaq);
    }

    async delete(id: string): Promise<any> {
        const existingFaq = await this.faqRepository.getFaqById(id);

        if (!existingFaq) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `FAQ with ID ${id} not found`, null);
        }

        await this.faqRepository.deleteFaq(id);
        return this.formatResponse(HttpStatus.OK, `FAQ with ID ${id} deleted successfully`, null);
    }
}
