// survey.interface.ts
export interface Survey {
    id: string;
    createdBy: string;
    updatedBy?: string;
    image: string;
    commentAdmin?: string;
    title: string;
    description?: string;
    branch: string;
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SurveyQuestion {
    id: string;
    surveyId: string;
    question: string;
    description?: string;
    answer1: string;
    answer2: string;
    answer3?: string;
    answer4?: string;
    answer5?: string;
    answer1Qty: number;
    answer2Qty: number;
    answer3Qty: number;
    answer4Qty: number;
    answer5Qty: number;
}

export interface SurveyParticipant {
    id: string;
    surveyId: string;
    userId: string;
    takenAt: Date;
}

export interface SurveyResponse {
    surveyId: string;
    userId: string;
    responses: {
        questionId: string;
        answerIndex: number; // 1-5 corresponding to which answer was selected
    }[];
}
