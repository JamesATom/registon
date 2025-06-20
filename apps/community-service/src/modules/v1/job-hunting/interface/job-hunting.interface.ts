// job-hunting.interface.ts
import { WorkExperience, WorkScheduleHours, EmploymentType, WorkMode } from '../enums/job-hunting.enum';

export interface JobHunting {
    id: string;
    title: string;
    description?: string;
    certificateRequirements?: string;
    workExperience: WorkExperience;
    workScheduleHours?: WorkScheduleHours;
    employmentType?: EmploymentType;
    workMode?: WorkMode;
    salary?: number;
    responsibilities?: string;
    requirements?: string;
    conditions?: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    companyId?: string;
    cityId?: string;
}

export interface Company {
    id: string;
    companyLogo?: string;
    companyTitle: string;
    description?: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
}
