import { ApiProperty } from '@nestjs/swagger';

export class StoryResponseEntity {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Story operation completed successfully' })
    message: string;

    @ApiProperty({
        example: {
            _id: '60a7c8b9e4b0c1234567890',
            title: 'Sample Story',
            description: 'This is a sample story',
            status: 'PUBLISHED',
            mainImage: 'https://example.com/image.jpg',
            datePublished: '2025-05-15T10:00:00Z',
            link: 'https://example.com/story',
            buttonText: 'Read More',
            branches: ['60a7c8b9e4b0c1234567891'],
            startDate: '2025-05-01T00:00:00Z',
            endDate: '2025-05-31T23:59:59Z',
            commentAdmin: 'Admin notes',
            createdBy: '60a7c8b9e4b0c1234567892',
            updatedBy: '60a7c8b9e4b0c1234567892',
            createdAt: '2025-05-15T09:00:00Z',
            updatedAt: '2025-05-15T09:30:00Z',
            storyItems: [],
        },
    })
    data: any;
}

export class StoryListResponseEntity {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Stories retrieved successfully' })
    message: string;

    @ApiProperty({
        example: [
            {
                _id: '60a7c8b9e4b0c1234567890',
                title: 'Sample Story 1',
                description: 'This is sample story 1',
                status: 'PUBLISHED',
                mainImage: 'https://example.com/image1.jpg',
                datePublished: '2025-05-15T10:00:00Z',
                link: 'https://example.com/story1',
                buttonText: 'Read More',
                branches: ['60a7c8b9e4b0c1234567891'],
                startDate: '2025-05-01T00:00:00Z',
                endDate: '2025-05-31T23:59:59Z',
                commentAdmin: 'Admin notes for story 1',
                createdBy: '60a7c8b9e4b0c1234567892',
                updatedBy: '60a7c8b9e4b0c1234567892',
                createdAt: '2025-05-15T09:00:00Z',
                updatedAt: '2025-05-15T09:30:00Z',
                storyItems: [],
            },
            {
                _id: '60a7c8b9e4b0c1234567893',
                title: 'Sample Story 2',
                description: 'This is sample story 2',
                status: 'DRAFT',
                mainImage: 'https://example.com/image2.jpg',
                datePublished: null,
                link: 'https://example.com/story2',
                buttonText: 'Read More',
                branches: ['60a7c8b9e4b0c1234567891'],
                startDate: '2025-05-01T00:00:00Z',
                endDate: '2025-05-31T23:59:59Z',
                commentAdmin: 'Admin notes for story 2',
                createdBy: '60a7c8b9e4b0c1234567892',
                updatedBy: '60a7c8b9e4b0c1234567892',
                createdAt: '2025-05-14T09:00:00Z',
                updatedAt: '2025-05-14T09:30:00Z',
                storyItems: [],
            },
        ],
    })
    data: any[];

    @ApiProperty({
        example: {
            total: 2,
            page: 1,
            limit: 10,
            totalPages: 1,
        },
    })
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export class StoryItemResponseEntity {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Story item operation completed successfully' })
    message: string;

    @ApiProperty({
        example: {
            _id: '60a7c8b9e4b0c1234567894',
            storyId: '60a7c8b9e4b0c1234567890',
            title: 'Sample Story Item',
            description: 'This is a sample story item',
            image: 'https://example.com/item-image.jpg',
            orderNumber: 1,
            createdAt: '2025-05-15T10:00:00Z',
            updatedAt: '2025-05-15T10:00:00Z',
        },
    })
    data: any;
}
