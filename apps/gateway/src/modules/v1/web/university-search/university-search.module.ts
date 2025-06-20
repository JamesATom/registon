import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { UniversitySearchController } from './controller/university-search.controller';
import { UniversitySearchService } from './service/university-search.service';

@Module({
    imports: [CommunityService],
    controllers: [UniversitySearchController],
    providers: [UniversitySearchService],
    exports: [UniversitySearchService],
})
export class UniversitySearchModule {}
