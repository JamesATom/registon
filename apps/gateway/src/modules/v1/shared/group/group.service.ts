import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';

@Injectable()
export class GroupService {
    constructor(private readonly externalService: ExternalService) {}

    async getGroupList(token?: string, limit?: number, page?: number): Promise<any> {
        return this.externalService.getGroupList(token, limit, page);
    }
}