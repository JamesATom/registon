// shop-product.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { ShopRepository } from '../repository/shop.repository';
import { CreateShopProductDto } from '../dto/create-shop-product.dto';
import { UpdateShopProductDto } from '../dto/update-shop-product.dto';

@Injectable()
export class ShopProductService {
    constructor(private readonly shopRepository: ShopRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data: data || {},
        };
    }

    async create(createShopProductDto: CreateShopProductDto): Promise<any> {
        try {
            // Verify that the category exists
            await this.shopRepository.getCategoryById(createShopProductDto.shopCategoryId);
            
            const product = await this.shopRepository.createProduct(createShopProductDto);
            return this.formatResponse(HttpStatus.CREATED, 'Shop product created successfully', product);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, error.message, null);
        }
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const products = await this.shopRepository.getAllProducts(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'Shop products retrieved successfully', products);
    }

    async getOne(id: string): Promise<any> {
        try {
            const product = await this.shopRepository.getProductById(id);
            return this.formatResponse(HttpStatus.OK, `Shop product with ID ${id} retrieved successfully`, product);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async getByCategory(categoryId: string): Promise<any> {
        try {
            // Verify that the category exists
            await this.shopRepository.getCategoryById(categoryId);
            
            const products = await this.shopRepository.getProductsByCategory(categoryId);
            return this.formatResponse(
                HttpStatus.OK,
                `Shop products for category ${categoryId} retrieved successfully`,
                products,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async update(id: string, updateShopProductDto: UpdateShopProductDto): Promise<any> {
        try {
            await this.shopRepository.getProductById(id);
            
            // If category ID is being updated, verify the new category exists
            if (updateShopProductDto.shopCategoryId) {
                await this.shopRepository.getCategoryById(updateShopProductDto.shopCategoryId);
            }
            
            const updatedProduct = await this.shopRepository.updateProduct(id, updateShopProductDto);
            return this.formatResponse(
                HttpStatus.OK,
                `Shop product with ID ${id} updated successfully`,
                updatedProduct,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.shopRepository.getProductById(id);
            await this.shopRepository.deleteProduct(id);
            return this.formatResponse(HttpStatus.OK, `Shop product with ID ${id} deleted successfully`, null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }
}
