// news.interface.ts
export interface News {
    id: string;
    title: string;
    description?: string;
    status: 'DRAFT' | 'PUBLISHED';
    thumbnail: string;
    mainImage: string;
    categoryId?: string;
    publishedAt?: Date;
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
}

export interface NewsCategory {
    id: string;
    categoryTitle: string;
    description?: string;
    image?: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy?: string;
}
