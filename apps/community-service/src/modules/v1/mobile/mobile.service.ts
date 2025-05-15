import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { MobileRepository } from './mobile.repository';

@Injectable()
export class MobileService {
    private readonly logger = new Logger(MobileService.name);

    constructor(
        private readonly mobileRepository: MobileRepository,
    ) {
        this.logger.log('MobileService initialized');
    }

    async findAllStoriesForMobile(filter?: any): Promise<ServiceResponse<any[]>> {
        this.logger.log('Getting all stories for mobile');
        return this.mobileRepository.findAllStoriesForMobile(filter);
    }

    async findStoryWithItemsById(id: string): Promise<ServiceResponse<any>> {
        this.logger.log(`Getting story with items by ID: ${id} for mobile`);
        return this.mobileRepository.findStoryWithItemsById(id);
    }
}
