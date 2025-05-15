import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MobileService } from './mobile.service';

@Controller()
export class MobileEvent {
    private readonly logger = new Logger(MobileEvent.name);

    constructor(private readonly mobileService: MobileService) {
        this.logger.log('MobileEvent initialized');
    }

    @MessagePattern('mobile.v1.get.all.stories')
    async getAllStoriesForMobile(data: any) {
        this.logger.log('Received request for all mobile stories', data);
        return this.mobileService.findAllStoriesForMobile(data);
    }

    @MessagePattern('mobile.v1.get.story.with.items')
    async getStoryWithItems(data: { id: string }) {
        this.logger.log(`Received request for mobile story with items: ${data.id}`);
        return this.mobileService.findStoryWithItemsById(data.id);
    }
}
