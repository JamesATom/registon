// university-search.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { UniversityController } from './controller/university.controller';
import { FacultyController } from './controller/faculty.controller';
import { ProgramController } from './controller/program.controller';
// import { CertificateRequirementController } from './controller/certificate-requirement.controller';
import { UniversityService } from './service/university.service';
import { FacultyService } from './service/faculty.service';
import { ProgramService } from './service/program.service';
import { CertificateRequirementService } from './service/certificate-requirement.service';

@Module({
    imports: [CommunityService],
    controllers: [
        UniversityController, 
        FacultyController, 
        ProgramController, 
        // CertificateRequirementController
    ],
    providers: [
        UniversityService, 
        FacultyService, 
        ProgramService, 
        CertificateRequirementService
    ],
    exports: [
        UniversityService, 
        FacultyService, 
        ProgramService, 
        CertificateRequirementService
    ],
})
export class UniversitySearchModule {}
