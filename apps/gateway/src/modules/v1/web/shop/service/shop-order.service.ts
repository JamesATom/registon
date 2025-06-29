// shop-order.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateShopOrderDto } from '../dto/create-shop-order.dto';
import { UpdateShopOrderDto } from '../dto/update-shop-order.dto';

@Injectable()
export class ShopOrderService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createShopOrderDto: CreateShopOrderDto, userId: string) {
        try {
            const data = {
                ...createShopOrderDto,
                studentId: userId,
                createdBy: userId,
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.CREATE, data).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.GET_ALL, {}).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getOne(id: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.GET_ONE, id).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getByStudent(studentId: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.GET_BY_STUDENT, studentId).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateShopOrderDto: UpdateShopOrderDto, userId: string) {
        try {
            const data = {
                id,
                updateShopOrderDto: {
                    ...updateShopOrderDto,
                    updatedBy: userId,
                },
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.UPDATE, data).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id: string, status: string, userId: string) {
        try {
            const data = {
                id,
                status,
                updatedBy: userId,
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.UPDATE_STATUS, data).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Order.DELETE, id).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }
}
