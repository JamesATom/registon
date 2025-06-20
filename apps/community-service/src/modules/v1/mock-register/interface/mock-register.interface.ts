// mock-register.interface.ts
export interface MockRegistration {
    id: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
    commentUser?: string;
    commentAdmin?: string;
    title?: string;
    date: Date;
    branchId: string;
    isActive: boolean;
}

export interface MockRegistrationStudent {
    id: string;
    studentId: string;
    mockRegistrationId: string;
    registeredAt: Date;
}

export interface CreateMockRegistrationDto {
    createdBy: string;
    commentUser?: string;
    commentAdmin?: string;
    title?: string;
    date: Date;
    branchId: string;
    isActive?: boolean;
}

export interface UpdateMockRegistrationDto {
    updatedBy?: string;
    commentUser?: string;
    commentAdmin?: string;
    title?: string;
    date?: Date;
    branchId?: string;
    isActive?: boolean;
}

export interface CreateMockRegistrationStudentDto {
    studentId: string;
    mockRegistrationId: string;
}

export interface MockRegistrationWithStudents extends MockRegistration {
    students?: MockRegistrationStudent[];
}
