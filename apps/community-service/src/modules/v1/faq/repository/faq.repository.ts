// faq.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { Faq, FaqCategory } from '../interface/faq.interface';

@Injectable()
export class FaqRepository extends BaseRepository<Faq, CreateFaqDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.FAQ);
    }

    async createFaq(dto: CreateFaqDto): Promise<Faq> {
        const created = await super.create(dto);
        return created[0];
    }

    async createFaqCategory(categoryData: CreateFaqCategoryDto): Promise<FaqCategory> {
        const created = await this.knex(TableNames.FAQ_CATEGORY).insert(categoryData).returning('*');
        return created[0];
    }

    async getAllFaqs(): Promise<Faq[]> {
        return super.getAll();
    }

    async getAllFaqsWithCategory(): Promise<any[]> {
        const results = await this.knex(this.tableName)
            .select(
                `${this.tableName}.*`,
                `${TableNames.FAQ_CATEGORY}.title as categoryTitle`,
                `${TableNames.FAQ_CATEGORY}.description as categoryDescription`,
            )
            .leftJoin(TableNames.FAQ_CATEGORY, `${this.tableName}.categoryId`, `${TableNames.FAQ_CATEGORY}.id`);

        return results;
    }

    async getFaqById(id: string): Promise<Faq | null> {
        return super.getOne(id);
    }

    async getFaqWithCategory(id: string): Promise<any> {
        const result = await this.knex(this.tableName)
            .select(
                `${this.tableName}.*`,
                `${TableNames.FAQ_CATEGORY}.title as categoryTitle`,
                `${TableNames.FAQ_CATEGORY}.description as categoryDescription`,
            )
            .leftJoin(TableNames.FAQ_CATEGORY, `${this.tableName}.categoryId`, `${TableNames.FAQ_CATEGORY}.id`)
            .where(`${this.tableName}.id`, id)
            .first();

        return result;
    }

    async updateFaq(id: string, dto: Partial<Faq>): Promise<Faq> {
        const updated = await super.update(id, dto);
        return updated[0];
    }

    async deleteFaq(id: string): Promise<void> {
        await super.delete(id);
    }

    async getAllCategories(): Promise<FaqCategory[]> {
        const categories = await this.knex(TableNames.FAQ_CATEGORY).select('*');
        return categories;
    }

    async getCategoryById(id: string): Promise<FaqCategory> {
        const category = await this.knex(TableNames.FAQ_CATEGORY).where('id', id).first();

        if (!category) {
            throw new RpcException({
                message: `FAQ Category with ID ${id} not found`,
                statusCode: 404,
            });
        }

        return category;
    }

    async getCategoryWithFaqs(id: string): Promise<any> {
        const category = await this.knex(TableNames.FAQ_CATEGORY).where(`${TableNames.FAQ_CATEGORY}.id`, id).first();

        if (!category) {
            throw new RpcException({
                message: `FAQ Category with ID ${id} not found`,
                statusCode: 404,
            });
        }

        const faqs = await this.knex(this.tableName).where('categoryId', id).select('*');

        return { ...category, faqs };
    }

    async updateCategory(id: string, dto: Partial<FaqCategory>): Promise<FaqCategory> {
        const updated = await this.knex(TableNames.FAQ_CATEGORY).where('id', id).update(dto).returning('*');

        return updated[0];
    }

    async deleteCategory(id: string): Promise<void> {
        await this.knex(TableNames.FAQ_CATEGORY).where('id', id).delete();
    }
}
