// faq-category.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { FaqRepository } from '../repository/faq.repository';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';

@Injectable()
export class FaqCategoryService {
    constructor(private readonly faqRepository: FaqRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data,
        };
    }

    async create(createFaqCategoryDto: CreateFaqCategoryDto): Promise<any> {
        const createdCategory = await this.faqRepository.createFaqCategory(createFaqCategoryDto);
        return this.formatResponse(HttpStatus.CREATED, 'FAQ Category created successfully', createdCategory);
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const data = await this.faqRepository.getAllCategories(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'FAQ Categories retrieved successfully', data);
    }

    async getOne(id: string): Promise<any> {
        try {
            const data = await this.faqRepository.getCategoryById(id);
            return this.formatResponse(HttpStatus.OK, `FAQ Category with ID ${id} retrieved successfully`, data);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async getCategoryWithFaqs(id: string): Promise<any> {
        try {
            const data = await this.faqRepository.getCategoryWithFaqs(id);
            return this.formatResponse(HttpStatus.OK, `FAQ Category with FAQs retrieved successfully`, data);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async update(id: string, updateFaqCategoryDto: UpdateFaqCategoryDto): Promise<any> {
        try {
            await this.faqRepository.getCategoryById(id);
            const updatedCategory = await this.faqRepository.updateCategory(id, updateFaqCategoryDto);
            return this.formatResponse(
                HttpStatus.OK,
                `FAQ Category with ID ${id} updated successfully`,
                updatedCategory,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.faqRepository.getCategoryById(id);
            await this.faqRepository.deleteCategory(id);
            return this.formatResponse(HttpStatus.OK, `FAQ Category with ID ${id} deleted successfully`, null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }
}
