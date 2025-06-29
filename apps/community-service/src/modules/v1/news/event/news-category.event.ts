// news-category.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { NewsCategoryService } from '../service/news-category.service';
import { CreateNewsCategoryDto } from '../dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from '../dto/update-news-category.dto';

@Controller()
export class NewsCategoryEvent {
    constructor(private readonly newsCategoryService: NewsCategoryService) {}

    @MessagePattern(MessagePatterns.NewsCategory.V1.CREATE)
    async create(@Payload() createNewsCategoryDto: CreateNewsCategoryDto): Promise<any> {
        return this.newsCategoryService.create(createNewsCategoryDto);
    }

    @MessagePattern(MessagePatterns.NewsCategory.V1.GET_ALL)
    async getAll(): Promise<any> {
        return this.newsCategoryService.getAll();
    }

    @MessagePattern(MessagePatterns.NewsCategory.V1.GET_ONE)
    async getOne(@Payload() { id }: { id: string }): Promise<any> {
        return this.newsCategoryService.getOne(id);
    }

    @MessagePattern(MessagePatterns.NewsCategory.V1.UPDATE)
    async update(
        @Payload() { id, updateNewsCategoryDto }: { id: string; updateNewsCategoryDto: UpdateNewsCategoryDto },
    ): Promise<any> {
        return this.newsCategoryService.update(id, updateNewsCategoryDto);
    }

    @MessagePattern(MessagePatterns.NewsCategory.V1.DELETE)
    async delete(@Payload() { id }: { id: string }): Promise<any> {
        return this.newsCategoryService.delete(id);
    }
}
