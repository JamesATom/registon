// branch.service.ts
import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';
import { RedisService } from '../redis/redis.service';
import { BranchResponseEntity } from './entity/branch-response.entity';

@Injectable()
export class BranchService {
    constructor(
        private readonly redisService: RedisService,
        private readonly externalService: ExternalService,
    ) {}

    async getAll(user: any): Promise<BranchResponseEntity[]> {
        const { token } = user.userData || {};
        const userData = await this.redisService.getUserByToken(token);
        
        if (userData && userData.userData && userData.userData.branches && userData.userData.branches.length > 0) {
            await this.redisService.setAllBranchData(userData.userData.branches);
            return userData.userData.branches;
        }
        
        const newBranchData = await this.externalService.getBranchList(token);

        if (!newBranchData || !newBranchData.data) {
            throw new Error('Failed to fetch new branch data');
        }

        const oldBranchData = await this.redisService.getAllBranchData();

        if (oldBranchData?.length === newBranchData.data.length) {
            return oldBranchData;
        }

        await this.redisService.setAllBranchData(newBranchData.data);
        return newBranchData.data;
    }
}
