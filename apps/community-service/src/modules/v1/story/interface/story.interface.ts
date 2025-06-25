// story.interface.ts
export interface Story {
    id: string;
    thumbnail: string;
    link?: string;
    branch: string;
    commentAdmin?: string;
    title: string;
    status: 'DRAFT' | 'PUBLISHED';
    publishedAt?: Date;
    buttonText?: string;
    createdBy: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    items?: StoryItem[];
}

export interface StoryItem {
    id: string;
    storyId: string;
    title?: string;
    description?: string;
    image: string;
    orderNumber: number;
}
