import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { CustomRequest } from 'src/common/types/types';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { ApiAuth, ApiGetAll } from 'src/common/swagger/common-swagger';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { GroupResponseEntity } from './entity/group-response.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Group')
@Controller({ path: 'group', version: 'v1' })
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get()
    @ApiGetAll('Groups', GroupResponseEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    async getGroupList(
        @Req() req: CustomRequest,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.groupService.getGroupList(req.user?.userData?.token, page, limit);
    }
}
