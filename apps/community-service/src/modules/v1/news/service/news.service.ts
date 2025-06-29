// news.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { NewsRepository } from '../repository/news.repository';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(private readonly newsRepository: NewsRepository) {}

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
            await this.newsRepository.getCategoryById(categoryId);
            return null;
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, `Category with ID ${categoryId} does not exist`, null);
        }
    }

    async create(createNewsDto: CreateNewsDto): Promise<any> {
        if (createNewsDto.categoryId) {
            const categoryValidationError = await this.validateCategory(createNewsDto.categoryId);
            if (categoryValidationError) return categoryValidationError;
        }

        const createdNews = await this.newsRepository.createNews(createNewsDto);
        return this.formatResponse(HttpStatus.CREATED, 'News created successfully', createdNews);
    }

    async getAll(): Promise<any> {
        const data = await this.newsRepository.getAllNews();
        return this.formatResponse(HttpStatus.OK, 'News retrieved successfully', data);
    }

    async getOne(id: string): Promise<any> {
        const data = await this.newsRepository.getNewsWithCategory(id);

        if (!data) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `News with ID ${id} not found`, null);
        }

        return this.formatResponse(HttpStatus.OK, `News with ID ${id} retrieved successfully`, data);
    }

    async update(id: string, updateNewsDto: UpdateNewsDto): Promise<any> {
        const existingNews = await this.newsRepository.getNewsById(id);

        if (!existingNews) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `News with ID ${id} not found`, null);
        }

        if (updateNewsDto.categoryId) {
            const categoryValidationError = await this.validateCategory(updateNewsDto.categoryId);
            if (categoryValidationError) return categoryValidationError;
        }

        const updatedNews = await this.newsRepository.updateNews(id, updateNewsDto);
        return this.formatResponse(HttpStatus.OK, `News with ID ${id} updated successfully`, updatedNews);
    }

    async delete(id: string): Promise<any> {
        const existingNews = await this.newsRepository.getNewsById(id);

        if (!existingNews) {
            return this.formatResponse(HttpStatus.NOT_FOUND, `News with ID ${id} not found`, null);
        }

        await this.newsRepository.deleteNews(id);
        return this.formatResponse(HttpStatus.OK, `News with ID ${id} deleted successfully`, null);
    }
}
