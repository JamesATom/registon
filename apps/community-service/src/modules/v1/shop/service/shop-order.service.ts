// shop-order.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { ShopRepository } from '../repository/shop.repository';
import { CreateShopOrderDto } from '../dto/create-shop-order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop-order.dto';

@Injectable()
export class ShopOrderService {
    constructor(private readonly shopRepository: ShopRepository) {}

    private formatResponse(statusCode: HttpStatus, message: string, data: any) {
        return {
            statusCode,
            message,
            data: data || {},
        };
    }

    async create(createShopOrderDto: CreateShopOrderDto): Promise<any> {
        try {
            // Verify that the product exists
            await this.shopRepository.getProductById(createShopOrderDto.product);
            
            const order = await this.shopRepository.createOrder(createShopOrderDto);
            return this.formatResponse(HttpStatus.CREATED, 'Shop order created successfully', order);
        } catch (error) {
            return this.formatResponse(HttpStatus.BAD_REQUEST, error.message, null);
        }
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        const orders = await this.shopRepository.getAllOrders(paginationParams);
        return this.formatResponse(HttpStatus.OK, 'Shop orders retrieved successfully', orders);
    }

    async getOne(id: string): Promise<any> {
        try {
            const order = await this.shopRepository.getOrderById(id);
            return this.formatResponse(HttpStatus.OK, `Shop order with ID ${id} retrieved successfully`, order);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async getByStudent(studentId: string): Promise<any> {
        try {
            const orders = await this.shopRepository.getOrdersByStudent(studentId);
            return this.formatResponse(
                HttpStatus.OK,
                `Shop orders for student ${studentId} retrieved successfully`,
                orders,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async update(id: string, updateShopOrderDto: UpdateShopOrderDto): Promise<any> {
        try {
            await this.shopRepository.getOrderById(id);
            
            // If product ID is being updated, verify the new product exists
            if (updateShopOrderDto.product) {
                await this.shopRepository.getProductById(updateShopOrderDto.product);
            }
            
            const updatedOrder = await this.shopRepository.updateOrder(id, updateShopOrderDto);
            return this.formatResponse(
                HttpStatus.OK,
                `Shop order with ID ${id} updated successfully`,
                updatedOrder,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async updateStatus(id: string, status: string, updatedBy: string): Promise<any> {
        try {
            await this.shopRepository.getOrderById(id);
            
            // Validate status
            if (!['READY', 'ACCEPTED', 'SENT', 'FINISHED'].includes(status)) {
                return this.formatResponse(
                    HttpStatus.BAD_REQUEST,
                    `Invalid status: ${status}. Must be one of: READY, ACCEPTED, SENT, FINISHED`,
                    null,
                );
            }
            
            const updatedOrder = await this.shopRepository.updateOrderStatus(
                id, 
                status as 'READY' | 'ACCEPTED' | 'SENT' | 'FINISHED',
                updatedBy
            );
            
            return this.formatResponse(
                HttpStatus.OK,
                `Shop order status updated to ${status} successfully`,
                updatedOrder,
            );
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            await this.shopRepository.getOrderById(id);
            await this.shopRepository.deleteOrder(id);
            return this.formatResponse(HttpStatus.OK, `Shop order with ID ${id} deleted successfully`, null);
        } catch (error) {
            return this.formatResponse(HttpStatus.NOT_FOUND, error.message, null);
        }
    }
}
