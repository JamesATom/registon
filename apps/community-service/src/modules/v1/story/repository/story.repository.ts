// story.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { FilterStoryDto } from '../dto/filter-story.dto';
import { Story } from '../interface/story.interface';

@Injectable()
export class StoryRepository extends BaseRepository<Story, CreateStoryDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.STORY);
    }

    async create(dto: CreateStoryDto): Promise<any> {
        const { items = [], ...storyData } = dto;

        return this.knex.transaction(async trx => {
            const [createdStory] = await trx(TableNames.STORY).insert(storyData).returning('*');

            if (items.length > 0) {
                const storyItems = items.map(item => ({
                    ...item,
                    storyId: createdStory.id,
                }));

                await trx(TableNames.STORY_ITEM).insert(storyItems);
            }

            const story = await trx(TableNames.STORY).select('*').where('id', createdStory.id).first();

            const storyItems = await trx(TableNames.STORY_ITEM)
                .select('*')
                .where('storyId', createdStory.id)
                .orderBy('orderNumber', 'asc');

            return {
                ...story,
                items: storyItems,
            };
        });
    }

    async getAll(filter?: FilterStoryDto & { page?: number; limit?: number }): Promise<{ data: Story[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        const { page, limit, ...restFilter } = filter || {};
        
        if (Object.keys(restFilter || {}).length > 0) {
            const query = this.knex(this.tableName);
            
            // Apply filters
            Object.entries(restFilter).forEach(([key, value]) => {
                if (value !== undefined) {
                    query.where(key, value);
                }
            });

            const [totalItems] = await query.clone().count('* as count');
            const data = await query
                .select('*')
                .offset(((page || 1) - 1) * (limit || 10))
                .limit(limit || 10);

            const totalPages = Math.ceil(Number(totalItems.count) / (limit || 10));

            return {
                data,
                pagination: {
                    totalItems: Number(totalItems.count),
                    itemsPerPage: limit || 10,
                    currentPage: page || 1,
                    totalPages,
                }
            };
        }

        return super.getAll({ page, limit });
    }

    async getOne(id: string): Promise<Story | null> {
        const story = await super.getOne(id);

        if (!story) {
            return null;
        }

        const storyItems = await this.knex(TableNames.STORY_ITEM)
            .select('*')
            .where('storyId', id)
            .orderBy('orderNumber', 'asc');

        return {
            ...story,
            items: storyItems,
        };
    }

    async update(id: string, dto: UpdateStoryDto): Promise<any> {
        const { items, ...storyData } = dto;

        return this.knex.transaction(async trx => {
            await trx(TableNames.STORY)
                .where('id', id)
                .update({
                    ...storyData,
                    updatedAt: this.knex.fn.now(),
                });

            if (items && items.length > 0) {
                await trx(TableNames.STORY_ITEM).where('storyId', id).delete();

                const storyItems = items.map(item => ({
                    ...item,
                    storyId: id,
                }));

                await trx(TableNames.STORY_ITEM).insert(storyItems);
            }

            const result = await trx(TableNames.STORY).select('*').where('id', id).first();

            const storyItems = await trx(TableNames.STORY_ITEM)
                .select('*')
                .where('storyId', id)
                .orderBy('orderNumber', 'asc');

            return {
                ...result,
                items: storyItems,
            };
        });
    }

    async delete(id: string): Promise<void> {
        await super.delete(id);
    }
}
