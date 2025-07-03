// news-category.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { NewsRepository } from '../repository/news.repository';
import { CreateNewsCategoryDto } from '../dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from '../dto/update-news-category.dto';

@Injectable()
export class NewsCategoryService {
    constructor(private readonly newsRepository: NewsRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data: data || {},
        };
    }

    async create(createNewsCategoryDto: CreateNewsCategoryDto): Promise<any> {
        const createdCategory = await this.newsRepository.createNewsCategory(createNewsCategoryDto);
        return this.formatResponse(HttpStatus.CREATED, 'News Category created successfully', createdCategory);
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const data = await this.newsRepository.getAllCategories(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'News Categories retrieved successfully', data);
    }

    async getOne(id: string): Promise<any> {
        try {
            const data = await this.newsRepository.getCategoryById(id);
            return this.formatResponse(HttpStatus.OK, `News Category with ID ${id} retrieved successfully`, data);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async getCategoryWithNews(id: string): Promise<any> {
        try {
            const data = await this.newsRepository.getCategoryWithNews(id);
            return this.formatResponse(HttpStatus.OK, `News Category with News retrieved successfully`, data);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async update(id: string, updateNewsCategoryDto: UpdateNewsCategoryDto): Promise<any> {
        try {
            await this.newsRepository.getCategoryById(id);
            const updatedCategory = await this.newsRepository.updateCategory(id, updateNewsCategoryDto);
            return this.formatResponse(
                HttpStatus.OK,
                `News Category with ID ${id} updated successfully`,
                updatedCategory,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.newsRepository.getCategoryById(id);
            await this.newsRepository.deleteCategory(id);
            return this.formatResponse(HttpStatus.OK, `News Category with ID ${id} deleted successfully`, null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }
}
