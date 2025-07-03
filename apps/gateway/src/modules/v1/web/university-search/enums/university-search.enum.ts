// university-search.enum.ts
export enum UniType {
    LOCAL = 'LOCAL',
    INTERNATIONAL = 'INTERNATIONAL',
    FOREIGN = 'FOREIGN'
}

export enum StudyLanguage {
    UZBEK = 'UZBEK',
    RUSSIAN = 'RUSSIAN',
    ENGLISH = 'ENGLISH'
}

export enum Degree {
    BACHELOR = 'BACHELOR',
    MASTER = 'MASTER',
    DOCTORATE = 'DOCTORATE',
    ASSOCIATE = 'ASSOCIATE', 
    PHD = 'PHD'
}

export enum StudyType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    REMOTE = 'REMOTE',
    HYBRID = 'HYBRID'
}

// Additional enum types from the migration
export enum CourseLevel {
    BEGINNER = 'BEGINNER',
    ELEMENTARY = 'ELEMENTARY',
    PRE_INTERMEDIATE = 'PRE_INTERMEDIATE',
    INTERMEDIATE = 'INTERMEDIATE',
    UPPER_INTERMEDIATE = 'UPPER_INTERMEDIATE',
    ADVANCED = 'ADVANCED',
    PROFICIENCY = 'PROFICIENCY'
}

export enum WorkExperience {
    EXPERIENCE_1_3 = 'Experience13',
    EXPERIENCE_3_6 = 'Experience36',
    EXPERIENCE_6_PLUS = 'Experience6Plus',
    NO_EXPERIENCE = 'NoExperience'
}

export enum WorkScheduleHours {
    SCHEDULE_6_1 = 'Schedule61',
    SCHEDULE_5_2 = 'Schedule52',
    WEEKENDS = 'Weekends',
    FREE = 'Free',
    OTHER = 'Other'
}

export enum EmploymentType {
    FULL = 'Full',
    PART = 'Part'
}

export enum WorkMode {
    OFFLINE = 'Offline',
    ONLINE = 'Online',
    HYBRID = 'Hybrid'
}
