import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from '../../../../common/interfaces/service-response.interface';
import { MobileStoryRepository } from './story.repository';

@Injectable()
export class MobileStoryService {
    constructor(private readonly mobileRepository: MobileStoryRepository) {}

    async findAllStoriesForMobile(userId: string): Promise<ServiceResponse<any[]>> {
        return this.mobileRepository.findAllStoriesForMobile(userId);
    }

    async findStoryWithItemsById(id: string, userId: string): Promise<ServiceResponse<any>> {
        return this.mobileRepository.findStoryWithItemsById(id, userId);
    }

    async trackStoryItems(
        storyId: string,
        storyItemId: string,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        return this.mobileRepository.trackStoryItems(storyId, storyItemId, userId);
    }

    async trackStoryButton(storyId: string, userId: string): Promise<ServiceResponse<any>> {
        return this.mobileRepository.trackStoryButton(storyId, userId);
    }
}
