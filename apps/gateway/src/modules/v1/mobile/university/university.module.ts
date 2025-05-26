import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CommunityService } from 'src/microservices';

@Module({
    imports: [CommunityService],
    controllers: [UniversityController],
    providers: [UniversityService, AuthGuard],
    exports: [UniversityService],
})
export class UniversityModule {}
