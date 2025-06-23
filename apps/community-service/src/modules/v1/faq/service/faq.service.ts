// faq.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { FaqRepository } from '../repository/faq.repository';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@Injectable()
export class FaqService {
    constructor(private readonly faqRepository: FaqRepository) {}

    async create(createFaqDto: CreateFaqDto): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'FAQ created successfully',
            data: await this.faqRepository.create(createFaqDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'FAQs retrieved successfully',
            data: await this.faqRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `FAQ with ID ${id} retrieved successfully`,
            data: await this.faqRepository.getOne(id),
        };
    }

    async update(id: string, updateFaqDto: UpdateFaqDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `FAQ with ID ${id} updated successfully`,
            data: await this.faqRepository.update(id, updateFaqDto),
        };
    }

    async delete(id: string): Promise<any> {
        await this.faqRepository.delete(id);

        return {
            statusCode: HttpStatus.OK,
            message: `FAQ with ID ${id} deleted successfully`,
        };
    }
}
