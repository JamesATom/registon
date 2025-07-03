// news.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { NewsService } from '../service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Controller()
export class NewsEvent {
    constructor(private readonly newsService: NewsService) {}

    @MessagePattern(MessagePatterns.News.V1.CREATE)
    async create(@Payload() createNewsDto: CreateNewsDto): Promise<any> {
        return this.newsService.create(createNewsDto);
    }

    @MessagePattern(MessagePatterns.News.V1.GET_ALL)
    async getAll(@Payload() paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return this.newsService.getAll(paginationParams);
    }

    @MessagePattern(MessagePatterns.News.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.newsService.getOne(id);
    }

    @MessagePattern(MessagePatterns.News.V1.UPDATE)
    async update(@Payload() { id, updateNewsDto }: { id: string; updateNewsDto: UpdateNewsDto }): Promise<any> {
        return this.newsService.update(id, updateNewsDto);
    }

    @MessagePattern(MessagePatterns.News.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.newsService.delete(id);
    }
}
