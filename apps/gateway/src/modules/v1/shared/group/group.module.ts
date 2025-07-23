// group.module.ts
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { ExternalService } from '../external/external.service';

@Module({
    providers: [GroupService, ExternalService],
    controllers: [GroupController],
    exports: [GroupService],
})
export class GroupModule {}