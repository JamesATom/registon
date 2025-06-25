// university-search.interface.ts
export interface University {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    title: string;
    description?: string;
    registrationDate: Date;
    type?: string;
    status?: boolean;
    contract: string;
    contacts?: number;
    website?: string;
    email?: string;
    address?: string;
    logo?: string;
    license?: string;
    city?: string;
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

export interface Program {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    title: string;
    studyLanguage: string;
    contract: number;
    degree: string;
    studyType?: string;
    facultyId?: string;
    universityId: string;
    certificateRequirementId?: string;
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
