// branch.service.ts
import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';
import { RedisService } from '../redis/redis.service';
import { BranchResponseEntity } from './entity/branch-response.entity';

@Injectable()
export class BranchService {
	constructor(
		private readonly redisService: RedisService,
		private readonly externalService: ExternalService
	) {}

	async getAll(token: string): Promise<BranchResponseEntity[]> {
		const newBranchData = await this.externalService.getBranchList(token);

		if (!newBranchData || !newBranchData.data) {
			throw new Error('Failed to fetch new branch data');
		}

		const oldBranchData = await this.redisService.getAllBranchData();

		if (oldBranchData?.length === newBranchData.data.length) {
			return oldBranchData;
		}

		await this.redisService.setAllBranchData(newBranchData.data);
		return newBranchData;
	}
}
