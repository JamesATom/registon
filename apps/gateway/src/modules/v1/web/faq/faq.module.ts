// faq.module.ts
import { Module } from '@nestjs/common';
import { FaqController } from './controller/faq.controller';
import { FaqCategoryController } from './controller/faq-category.controller';
import { FaqService } from './service/faq.service';
import { FaqCategoryService } from './service/faq-category.service';
import { CommunityService } from 'src/microservices/community.service';

@Module({
    imports: [CommunityService],
    controllers: [FaqController, FaqCategoryController],
    providers: [FaqService, FaqCategoryService],
})
export class FaqModule {}
