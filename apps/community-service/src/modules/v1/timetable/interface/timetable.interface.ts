export interface Timetable {
    id: string;
    supportTeacherId?: string;
    branchId: string;
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    commentUser?: string;
    timeFrom: string;
    timeTo: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
}

export interface Calendar {
    id: string;
    dateCreate: Date;
    date: Date;
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    timeFrom: string;
    timeTo: string;
    branchId: string;
    supportTeacherId?: string;
    timetableId: string;
    reservationsNumber?: number;
}

export interface Reservation {
    id: string;
    commentUser?: string;
    status?: 'RESERVED' | 'STUDENT_CANCELLED' | 'TEACHER_CANCELLED' | 'MISSED';
    studentId?: string;
    reservationCalendarId: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
}
