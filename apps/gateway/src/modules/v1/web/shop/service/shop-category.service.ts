// shop-category.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateShopCategoryDto } from '../dto/create-shop-category.dto';
import { UpdateShopCategoryDto } from '../dto/update-shop-category.dto';

@Injectable()
export class ShopCategoryService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createShopCategoryDto: CreateShopCategoryDto, userId: string) {
        try {
            const data = {
                ...createShopCategoryDto,
                createdBy: userId,
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Category.CREATE, data).pipe(
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
                this.client.send(MessagePatterns.Shop.V1.Category.GET_ALL, {}).pipe(
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
                this.client.send(MessagePatterns.Shop.V1.Category.GET_ONE, id).pipe(
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

    async update(id: string, updateShopCategoryDto: UpdateShopCategoryDto, userId: string) {
        try {
            const data = {
                id,
                updateShopCategoryDto: {
                    ...updateShopCategoryDto,
                    updatedBy: userId,
                },
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Category.UPDATE, data).pipe(
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
                this.client.send(MessagePatterns.Shop.V1.Category.DELETE, id).pipe(
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
