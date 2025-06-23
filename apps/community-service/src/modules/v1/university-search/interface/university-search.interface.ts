// university-search.interface.ts
import { UniType, StudyLanguage, StudyType, Degree } from '../enum/university.enum';

export interface University {
    id: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
    title: string;
    description?: string;
    registrationDate: Date;
    type?: UniType;
    status?: boolean;
    contract: string;
    contacts?: number;
    website?: string;
    email?: string;
    address?: string;
    logo?: string;
    license?: string;
    cityId?: string;
    certificateRequirementId?: string;
}

export interface Program {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    title: string;
    studyLanguage: StudyLanguage;
    contract: number;
    degree: Degree;
    studyType?: StudyType;
    facultyId?: string;
    universityId: string;
    certificateRequirementId?: string;
}

export interface Faculty {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    facultyTitle: string;
    description?: string;
    universityId: string;
}

export interface CertificateRequirement {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    certificateRequirementsTitle: string;
    description?: string;
}
