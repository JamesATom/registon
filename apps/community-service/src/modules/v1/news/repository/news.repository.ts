// news.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import { RpcException } from '@nestjs/microservices';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { News, NewsCategory } from '../interface/news.interface';
import { CreateNewsDto } from '../dto/create-news.dto';
import { CreateNewsCategoryDto } from '../dto/create-news-category.dto';

@Injectable()
export class NewsRepository extends BaseRepository<News, CreateNewsDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.NEWS);
    }

    async createNews(dto: CreateNewsDto): Promise<News> {
        const created = await super.create(dto);
        return created[0];
    }

    async createNewsCategory(categoryData: CreateNewsCategoryDto): Promise<NewsCategory> {
        const created = await this.knex(TableNames.NEWS_CATEGORY).insert(categoryData).returning('*');
        return created[0];
    }

    async getAllNews(): Promise<News[]> {
        return super.getAll();
    }

    async getAllNewsWithCategory(): Promise<any[]> {
        return super.getAll();
    }

    async getNewsById(id: string): Promise<News | null> {
        return super.getOne(id);
    }

    async getNewsWithCategory(id: string): Promise<any> {
        const result = await this.knex(this.tableName)
            .select(
                `${this.tableName}.*`,
                `${TableNames.NEWS_CATEGORY}.categoryTitle`,
                `${TableNames.NEWS_CATEGORY}.description as categoryDescription`,
                `${TableNames.NEWS_CATEGORY}.image as categoryImage`,
            )
            .leftJoin(TableNames.NEWS_CATEGORY, `${this.tableName}.categoryId`, `${TableNames.NEWS_CATEGORY}.id`)
            .where(`${this.tableName}.id`, id)
            .first();

        return result;
    }

    async updateNews(id: string, dto: any): Promise<News> {
        const updated = await super.update(id, dto);
        return updated[0];
    }

    async deleteNews(id: string): Promise<void> {
        await super.delete(id);
    }

    async getAllCategories(): Promise<NewsCategory[]> {
        const categories = await this.knex(TableNames.NEWS_CATEGORY).select('*');
        return categories;
    }

    async getCategoryById(id: string): Promise<NewsCategory> {
        const category = await this.knex(TableNames.NEWS_CATEGORY).where('id', id).first();

        if (!category) {
            throw new RpcException({
                message: `News Category with ID ${id} not found`,
                statusCode: 404,
            });
        }

        return category;
    }

    async getCategoryWithNews(id: string): Promise<any> {
        const category = await this.knex(TableNames.NEWS_CATEGORY).where(`${TableNames.NEWS_CATEGORY}.id`, id).first();

        if (!category) {
            throw new RpcException({
                message: `News Category with ID ${id} not found`,
                statusCode: 404,
            });
        }

        const news = await this.knex(this.tableName).where('categoryId', id).select('*');

        return { ...category, news };
    }

    async updateCategory(id: string, dto: Partial<NewsCategory>): Promise<NewsCategory> {
        const updated = await this.knex(TableNames.NEWS_CATEGORY).where('id', id).update(dto).returning('*');

        return updated[0];
    }

    async deleteCategory(id: string): Promise<void> {
        await this.knex(TableNames.NEWS_CATEGORY).where('id', id).delete();
    }
}
