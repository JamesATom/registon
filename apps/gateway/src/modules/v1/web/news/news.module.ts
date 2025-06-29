// news.module.ts
import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { NewsCategoryController } from './controller/news-category.controller';
import { NewsService } from './service/news.service';
import { NewsCategoryService } from './service/news-category.service';
import { CommunityService } from 'src/microservices/community.service';

@Module({
    imports: [CommunityService],
    controllers: [NewsController, NewsCategoryController],
    providers: [NewsService, NewsCategoryService],
})
export class NewsModule {}
