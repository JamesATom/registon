// news.module.ts
import { Module } from '@nestjs/common';
import { NewsRepository } from './repository/news.repository';
import { NewsService } from './service/news.service';
import { NewsCategoryService } from './service/news-category.service';
import { NewsEvent } from './event/news.event';
import { NewsCategoryEvent } from './event/news-category.event';

@Module({
    controllers: [NewsEvent, NewsCategoryEvent],
    providers: [NewsService, NewsCategoryService, NewsRepository],
})
export class NewsModule {}
