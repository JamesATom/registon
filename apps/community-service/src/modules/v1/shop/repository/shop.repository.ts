// shop.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { ShopCategory, ShopProduct, ShopOrder } from '../interface/shop.interface';

@Injectable()
export class ShopRepository extends BaseRepository<ShopCategory, any> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.SHOP_CATEGORY);
    }

    // Shop Category methods
    async createCategory(data: Partial<ShopCategory>): Promise<ShopCategory> {
        const [category] = await this.knex(TableNames.SHOP_CATEGORY).insert(data).returning('*');
        return category;
    }

    async getAllCategories(paginationParams?: { page?: number; limit?: number }): Promise<{ data: ShopCategory[]; pagination: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.SHOP_CATEGORY).count('* as count');
        const data = await this.knex(TableNames.SHOP_CATEGORY)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            pagination: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getCategoryById(id: string): Promise<ShopCategory | null> {
        const category = await this.knex(TableNames.SHOP_CATEGORY).where('id', id).first();
        if (!category) {
            throw new Error(`Category with ID ${id} not found`);
        }
        return category;
    }

    async updateCategory(id: string, data: Partial<ShopCategory>): Promise<ShopCategory> {
        const [updated] = await this.knex(TableNames.SHOP_CATEGORY)
            .where('id', id)
            .update({
                ...data,
                updatedAt: this.knex.fn.now(),
            })
            .returning('*');
        return updated;
    }

    async deleteCategory(id: string): Promise<void> {
        await this.knex(TableNames.SHOP_CATEGORY).where('id', id).delete();
    }

    // Shop Product methods
    async createProduct(data: Partial<ShopProduct>): Promise<ShopProduct> {
        const [product] = await this.knex(TableNames.SHOP_PRODUCT).insert(data).returning('*');
        return product;
    }

    async getAllProducts(paginationParams?: { page?: number; limit?: number }): Promise<{ data: ShopProduct[]; pagination: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.SHOP_PRODUCT).count('* as count');
        const data = await this.knex(TableNames.SHOP_PRODUCT)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            pagination: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getProductById(id: string): Promise<ShopProduct | null> {
        const product = await this.knex(TableNames.SHOP_PRODUCT).where('id', id).first();
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return product;
    }

    async getProductsByCategory(categoryId: string): Promise<ShopProduct[]> {
        return this.knex(TableNames.SHOP_PRODUCT)
            .select('*')
            .where('shopCategoryId', categoryId);
    }

    async updateProduct(id: string, data: Partial<ShopProduct>): Promise<ShopProduct> {
        const [updated] = await this.knex(TableNames.SHOP_PRODUCT)
            .where('id', id)
            .update({
                ...data,
                updatedAt: this.knex.fn.now(),
            })
            .returning('*');
        return updated;
    }

    async deleteProduct(id: string): Promise<void> {
        await this.knex(TableNames.SHOP_PRODUCT).where('id', id).delete();
    }

    // Shop Order methods
    async createOrder(data: Partial<ShopOrder>): Promise<ShopOrder> {
        const [order] = await this.knex(TableNames.SHOP_ORDER).insert(data).returning('*');
        return order;
    }

    async getAllOrders(paginationParams?: { page?: number; limit?: number }): Promise<{ data: ShopOrder[]; pagination: any }> {
        const page = paginationParams?.page || 1;
        const limit = paginationParams?.limit || 10;
        const offset = (page - 1) * limit;

        const [totalItems] = await this.knex(TableNames.SHOP_ORDER).count('* as count');
        const data = await this.knex(TableNames.SHOP_ORDER)
            .select('*')
            .offset(offset)
            .limit(limit);

        const totalPages = Math.ceil(Number(totalItems.count) / limit);

        return {
            data,
            pagination: {
                totalItems: Number(totalItems.count),
                itemsPerPage: limit,
                currentPage: page,
                totalPages,
            }
        };
    }

    async getOrderById(id: string): Promise<ShopOrder | null> {
        const order = await this.knex(TableNames.SHOP_ORDER).where('id', id).first();
        if (!order) {
            throw new Error(`Order with ID ${id} not found`);
        }
        return order;
    }

    async getOrdersByStudent(studentId: string): Promise<ShopOrder[]> {
        return this.knex(TableNames.SHOP_ORDER)
            .select('*')
            .where('student', studentId);
    }

    async updateOrder(id: string, data: Partial<ShopOrder>): Promise<ShopOrder> {
        const [updated] = await this.knex(TableNames.SHOP_ORDER)
            .where('id', id)
            .update({
                ...data,
                updatedAt: this.knex.fn.now(),
            })
            .returning('*');
        return updated;
    }

    async updateOrderStatus(id: string, status: ShopOrder['status'], updatedBy: string): Promise<ShopOrder> {
        const [updated] = await this.knex(TableNames.SHOP_ORDER)
            .where('id', id)
            .update({
                status,
                updatedBy,
                updatedAt: this.knex.fn.now(),
            })
            .returning('*');
        return updated;
    }

    async deleteOrder(id: string): Promise<void> {
        await this.knex(TableNames.SHOP_ORDER).where('id', id).delete();
    }
}
