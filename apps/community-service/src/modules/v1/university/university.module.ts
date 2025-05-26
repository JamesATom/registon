import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UniversityEvents } from './university.event';
import { UniversityService } from './university.service';
import { UniversityRepository } from './university.repository';

@Module({
    imports: [SharedModule],
    controllers: [UniversityEvents],
    providers: [UniversityEvents, UniversityService, UniversityRepository],
    exports: [UniversityService],
})
export class UniversityModule {}
