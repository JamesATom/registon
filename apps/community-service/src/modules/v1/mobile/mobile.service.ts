import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { MobileRepository } from './mobile.repository';

@Injectable()
export class MobileService {
    constructor(private readonly mobileRepository: MobileRepository) {}

    async findAllStoriesForMobile(filter?: any): Promise<ServiceResponse<any[]>> {
        return this.mobileRepository.findAllStoriesForMobile(filter);
    }

    async findStoryWithItemsById(id: string): Promise<ServiceResponse<any>> {
        return this.mobileRepository.findStoryWithItemsById(id);
    }
}
