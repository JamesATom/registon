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
        return firstValueFrom(
            this.client.send(MessagePatterns.Mobile.V1.GET_ALL_STORIES, {}).pipe(timeout(10000)),
        );
    }

    async getStoryWithItemsById(id: string) {
        return await firstValueFrom(
            this.client
                .send(MessagePatterns.Mobile.V1.GET_STORY_WITH_ITEMS, { id })
                .pipe(timeout(10000)),
        );
    }
}
