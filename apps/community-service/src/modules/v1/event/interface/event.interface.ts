// event.interface.ts
export interface Event {
    id: string;
    createdBy: string;
    updatedBy?: string;
    commentAdmin?: string;
    status: 'DRAFT' | 'PUBLISHED';
    branch: string;
    eventTitle: string;
    date: Date;
    startTime: string;
    endTime?: string;
    age?: number;
    image: string;
    description?: string;
    price?: number;
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
    course?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EventRegistrationStudent {
    id: string;
    studentId: string;
    eventId: string;
    registeredAt: Date;
}