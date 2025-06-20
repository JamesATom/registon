// faq.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { FaqController } from './controller/faq.controller';
import { FaqService } from './service/faq.service';
import { FaqCategoryController } from './controller/faq-category.controller';
import { FaqCategoryService } from './service/faq-category.service';

@Module({
    imports: [CommunityService],
    controllers: [FaqController, FaqCategoryController],
    providers: [FaqService, FaqCategoryService],
    exports: [FaqService, FaqCategoryService],
})
export class FaqModule {}
