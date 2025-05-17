// branch.module.ts
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';

@Module({
    imports: [
        ExternalModule,
    ],
    controllers: [BranchController],
    providers: [BranchService],
})
export class BranchModule {}
