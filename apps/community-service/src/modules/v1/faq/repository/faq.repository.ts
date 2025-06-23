// faq.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { Faq } from '../interface/faq.interface';

@Injectable()
export class FaqRepository extends BaseRepository<Faq, CreateFaqDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.FAQ);
    }

    async create(dto: CreateFaqDto): Promise<Faq> {
        try {
            // Check if the category exists
            const categoryExists = await this.knex(TableNames.FAQ_CATEGORY).where('id', dto.categoryId).first();

            if (!categoryExists) {
                throw new RpcException({
                    message: `Category with ID ${dto.categoryId} not found`,
                    statusCode: 404,
                });
            }

            const created = await super.create(dto);
            return created[0];
        } catch (error) {
            throw new RpcException(error.message || 'Error creating FAQ');
        }
    }

    async getAll(): Promise<Faq[]> {
        try {
            return await this.knex(this.tableName)
                .select('*')
                .leftJoin(TableNames.FAQ_CATEGORY, `${this.tableName}.categoryId`, `${TableNames.FAQ_CATEGORY}.id`)
                .select(
                    `${this.tableName}.*`,
                    `${TableNames.FAQ_CATEGORY}.title as categoryTitle`,
                    `${TableNames.FAQ_CATEGORY}.description as categoryDescription`,
                );
        } catch (error) {
            throw new RpcException(error.message || 'Error retrieving FAQs');
        }
    }

    async getOne(id: string): Promise<Faq> {
        try {
            const faq = await this.knex(this.tableName)
                .where(`${this.tableName}.id`, id)
                .leftJoin(TableNames.FAQ_CATEGORY, `${this.tableName}.categoryId`, `${TableNames.FAQ_CATEGORY}.id`)
                .select(
                    `${this.tableName}.*`,
                    `${TableNames.FAQ_CATEGORY}.title as categoryTitle`,
                    `${TableNames.FAQ_CATEGORY}.description as categoryDescription`,
                )
                .first();

            if (!faq) {
                throw new RpcException({
                    message: `FAQ with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            return faq;
        } catch (error) {
            throw new RpcException(error.message || 'Error retrieving FAQ');
        }
    }

    async update(id: string, dto: UpdateFaqDto): Promise<Faq> {
        try {
            // Check if the FAQ exists
            const faqExists = await this.knex(this.tableName).where('id', id).first();

            if (!faqExists) {
                throw new RpcException({
                    message: `FAQ with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            // If category ID is provided, check if it exists
            if (dto.categoryId) {
                const categoryExists = await this.knex(TableNames.FAQ_CATEGORY).where('id', dto.categoryId).first();

                if (!categoryExists) {
                    throw new RpcException({
                        message: `Category with ID ${dto.categoryId} not found`,
                        statusCode: 404,
                    });
                }
            }

            const updated = await super.update(id, dto);
            return updated[0];
        } catch (error) {
            throw new RpcException(error.message || 'Error updating FAQ');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            // Check if the FAQ exists
            const faqExists = await this.knex(this.tableName).where('id', id).first();

            if (!faqExists) {
                throw new RpcException({
                    message: `FAQ with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            await super.delete(id);
        } catch (error) {
            throw new RpcException(error.message || 'Error deleting FAQ');
        }
    }
}
