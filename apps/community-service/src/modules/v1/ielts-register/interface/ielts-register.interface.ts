// ielts-register.interface.ts
export interface IeltsExam {
    id: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    dateExam: Date;
    cityId: string;
    commentAdmin?: string;
    commentUser?: string;
    isActive: boolean;
}

export interface IeltsRegistrationStudent {
    id: string;
    examId: string;
    studentId: string;
    registeredAt: Date;
}
