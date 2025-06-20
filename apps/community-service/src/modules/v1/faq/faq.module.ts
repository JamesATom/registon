// faq.module.ts
import { Module } from '@nestjs/common';
import { FaqRepository } from './repository/faq.repository';
import { FaqCategoryRepository } from './repository/faq-category.repository';
import { FaqService } from './service/faq.service';
import { FaqCategoryService } from './service/faq-category.service';
import { FaqEvent } from './event/faq.event';
import { FaqCategoryEvent } from './event/faq-category.event';

@Module({
    controllers: [FaqEvent, FaqCategoryEvent],
    providers: [
        FaqService, 
        FaqCategoryService, 
        FaqRepository, 
        FaqCategoryRepository
    ],
})
export class FaqModule {}
