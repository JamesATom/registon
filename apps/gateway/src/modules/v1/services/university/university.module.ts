import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

import { CommunityService } from 'src/microservices';

@Module({
    imports: [CommunityService],
    controllers: [UniversityController],
    providers: [UniversityService],
    exports: [UniversityService],
})
export class UniversityModule {}
