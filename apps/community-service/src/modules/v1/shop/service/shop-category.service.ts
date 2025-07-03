// shop-category.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { ShopRepository } from '../repository/shop.repository';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';

@Injectable()
export class ShopCategoryService {
    constructor(private readonly shopRepository: ShopRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data: data || {},
        };
    }

    async create(createShopCategoryDto: CreateShopCategoryDto): Promise<any> {
        const category = await this.shopRepository.createCategory(createShopCategoryDto);
        return this.formatResponse(HttpStatus.CREATED, 'Shop category created successfully', category);
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const categories = await this.shopRepository.getAllCategories(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'Shop categories retrieved successfully', categories);
    }

    async getOne(id: string): Promise<any> {
        try {
            const category = await this.shopRepository.getCategoryById(id);
            return this.formatResponse(HttpStatus.OK, `Shop category with ID ${id} retrieved successfully`, category);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async update(id: string, updateShopCategoryDto: UpdateShopCategoryDto): Promise<any> {
        try {
            await this.shopRepository.getCategoryById(id);
            const updatedCategory = await this.shopRepository.updateCategory(id, updateShopCategoryDto);
            return this.formatResponse(
                HttpStatus.OK,
                `Shop category with ID ${id} updated successfully`,
                updatedCategory,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.shopRepository.getCategoryById(id);
            await this.shopRepository.deleteCategory(id);
            return this.formatResponse(HttpStatus.OK, `Shop category with ID ${id} deleted successfully`, null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }
}
