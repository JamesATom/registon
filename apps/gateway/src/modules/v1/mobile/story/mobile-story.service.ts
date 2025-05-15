import {
    GatewayTimeoutException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, TimeoutError } from 'rxjs';
import { MessagePatterns } from '../../../../common/constants/message-pattern';

@Injectable()
export class MobileStoryService {
    private readonly logger = new Logger(MobileStoryService.name);

    constructor(@Inject('COMMUNITY_SERVICE') private client: ClientProxy) {
        this.logger.log('MobileService initialized');
    }

    async getAllStoriesForMobile() {
        this.logger.log('Getting all stories for mobile');
        try {
            const response = await firstValueFrom(
                this.client
                    .send(MessagePatterns.Mobile.V1.GET_ALL_STORIES, {})
                    .pipe(timeout(10000)),
            );

            if (response.status === 'error') {
                const statusCode = response.statusCode || 500;
                throw new HttpException(response.message, statusCode);
            }

            return response.data;
        } catch (error) {
            if (error instanceof TimeoutError) {
                throw new GatewayTimeoutException('Service timeout');
            }
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Failed to get stories for mobile: ${error.message}`,
            );
        }
    }

    async getStoryWithItemsById(id: string) {
        this.logger.log(`Getting story with items by ID: ${id} for mobile`);
        try {
            const response = await firstValueFrom(
                this.client
                    .send(MessagePatterns.Mobile.V1.GET_STORY_WITH_ITEMS, { id })
                    .pipe(timeout(10000)),
            );

            if (response.status === 'error') {
                const statusCode = response.statusCode || 500;
                if (statusCode === 404) {
                    throw new NotFoundException(response.message);
                } else {
                    throw new HttpException(response.message, statusCode);
                }
            }

            return response.data;
        } catch (error) {
            if (error instanceof TimeoutError) {
                throw new GatewayTimeoutException('Service timeout');
            }
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException(
                `Failed to get story with items for mobile: ${error.message}`,
            );
        }
    }
}
