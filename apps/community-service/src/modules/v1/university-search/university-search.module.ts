import { Module } from '@nestjs/common';
import { UniversitySearchService } from './service/university-search.service';
import { UniversitySearchRepository } from './repository/university-search.repository';
import { UniversitySearchEvent } from './university-search.event';

@Module({
    imports: [],
    controllers: [UniversitySearchEvent],
    providers: [UniversitySearchService, UniversitySearchRepository],
    exports: [UniversitySearchService],
})
export class UniversitySearchModule {}
