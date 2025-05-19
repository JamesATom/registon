// branch.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { CustomRequest } from 'src/common/types/types';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { ApiAuth, ApiGetAll } from 'src/common/swagger/common-swagger';
import { BranchService } from './branch.service';
import { BranchResponseEntity } from './entity/branch-response.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller({ path: 'branch', version: '1' })
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Get('all')
    @ApiGetAll('Branches', BranchResponseEntity)
    async getAll(@Req() req: CustomRequest): Promise<BranchResponseEntity[]> {
        return this.branchService.getAll(req.user.id);
    }
}
