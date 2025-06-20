// faq-category.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';
import { FaqCategory } from '../interface/faq.interface';

@Injectable()
export class FaqCategoryRepository extends BaseRepository<FaqCategory, CreateFaqCategoryDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.FAQ_CATEGORY);
    }

    async create(dto: CreateFaqCategoryDto): Promise<FaqCategory> {
        try {
            const created = await super.create(dto);
            return created[0];
        } catch (error) {
            throw new RpcException(error.message || 'Error creating FAQ category');
        }
    }

    async getAll(): Promise<FaqCategory[]> {
        try {
            const categories = await super.getAll();
            
            // Count FAQs for each category
            for (const category of categories) {
                const count = await this.knex(TableNames.FAQ)
                    .where('categoryId', category.id)
                    .count('id as faqCount')
                    .first();
                
                category.faqCount = parseInt(count.faqCount as string, 10);
            }
            
            return categories;
        } catch (error) {
            throw new RpcException(error.message || 'Error retrieving FAQ categories');
        }
    }

    async getOne(id: string): Promise<FaqCategory> {
        try {
            const category = await super.getOne(id);
            
            if (!category) {
                throw new RpcException({
                    message: `FAQ category with ID ${id} not found`,
                    statusCode: 404,
                });
            }
            
            // Count FAQs for this category
            const count = await this.knex(TableNames.FAQ)
                .where('categoryId', id)
                .count('id as faqCount')
                .first();
            
            category.faqCount = parseInt(count.faqCount as string, 10);
            
            // Get related FAQs
            const faqs = await this.knex(TableNames.FAQ)
                .where('categoryId', id)
                .select('*');
            
            category.faqs = faqs;
            
            return category;
        } catch (error) {
            throw new RpcException(error.message || 'Error retrieving FAQ category');
        }
    }

    async update(id: string, dto: UpdateFaqCategoryDto): Promise<FaqCategory> {
        try {
            // Check if the category exists
            const categoryExists = await this.knex(this.tableName)
                .where('id', id)
                .first();

            if (!categoryExists) {
                throw new RpcException({
                    message: `FAQ category with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            const updated = await super.update(id, dto);
            return updated[0];
        } catch (error) {
            throw new RpcException(error.message || 'Error updating FAQ category');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            // Check if the category exists
            const categoryExists = await this.knex(this.tableName)
                .where('id', id)
                .first();

            if (!categoryExists) {
                throw new RpcException({
                    message: `FAQ category with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            // Check if there are FAQs in this category
            const faqCount = await this.knex(TableNames.FAQ)
                .where('categoryId', id)
                .count('id as count')
                .first();

            if (parseInt(faqCount.count as string, 10) > 0) {
                throw new RpcException({
                    message: `Cannot delete category with existing FAQs. Delete all FAQs in this category first.`,
                    statusCode: 400,
                });
            }

            await super.delete(id);
        } catch (error) {
            throw new RpcException(error.message || 'Error deleting FAQ category');
        }
    }
}
