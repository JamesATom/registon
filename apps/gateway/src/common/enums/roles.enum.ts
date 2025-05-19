// roles.enum.ts
export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
}

export const RoleLevel = {
    [UserRole.SUPERADMIN]: 1,
    [UserRole.ADMIN]: 2,
};

export enum IeltsExamStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}
