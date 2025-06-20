// faq.interface.ts
export interface Faq {
    id: string;
    question: string;
    answer: string;
    categoryId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
}

export interface FaqCategory {
    id: string;
    title: string;
    description?: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
}
