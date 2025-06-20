// faq-category.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { FaqCategoryRepository } from '../repository/faq-category.repository';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';

@Injectable()
export class FaqCategoryService {
    constructor(private readonly faqCategoryRepository: FaqCategoryRepository) {}

    async create(createFaqCategoryDto: CreateFaqCategoryDto): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'FAQ category created successfully',
            data: await this.faqCategoryRepository.create(createFaqCategoryDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'FAQ categories retrieved successfully',
            data: await this.faqCategoryRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `FAQ category with ID ${id} retrieved successfully`,
            data: await this.faqCategoryRepository.getOne(id),
        };
    }

    async update(id: string, updateFaqCategoryDto: UpdateFaqCategoryDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `FAQ category with ID ${id} updated successfully`,
            data: await this.faqCategoryRepository.update(id, updateFaqCategoryDto),
        };
    }

    async delete(id: string): Promise<any> {
        await this.faqCategoryRepository.delete(id);
        
        return {
            statusCode: HttpStatus.OK,
            message: `FAQ category with ID ${id} deleted successfully`,
        };
    }
}
