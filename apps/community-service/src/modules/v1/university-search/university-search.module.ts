// university-search.module.ts
import { Module } from '@nestjs/common';
import { UniversityRepository } from './repository/university.repository';
import { UniversityService } from './service/university.service';
import { FacultyService } from './service/faculty.service';
import { ProgramService } from './service/program.service';
import { CertificateRequirementService } from './service/certificate-requirement.service';
import { UniversityEvent } from './event/university.event';
import { FacultyEvent } from './event/faculty.event';
import { ProgramEvent } from './event/program.event';
import { CertificateRequirementEvent } from './event/certificate-requirement.event';

@Module({
    controllers: [UniversityEvent, FacultyEvent, ProgramEvent, CertificateRequirementEvent],
    providers: [UniversityService, FacultyService, ProgramService, CertificateRequirementService, UniversityRepository],
})
export class UniversitySearchModule {}
