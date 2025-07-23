// poll.interface.ts
export interface Poll {
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

export interface PollQuestion {
    id: string;
    pollId: string;
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

export interface PollParticipant {
    id: string;
    pollId: string;
    userId: string;
    takenAt: Date;
}

export interface PollResponse {
    pollId: string;
    userId: string;
    responses: {
        questionId: string;
        answerIndex: number; 
    }[];
}
