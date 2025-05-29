import { ApiProperty } from '@nestjs/swagger';

export class MobileStoryItemEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    storyId: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    orderNumber: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ description: 'Whether the student has viewed this story item' })
    isViewed: boolean;
}

export class MobileBranchEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;
}

export class MobileStoryEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    mainImage: string;

    @ApiProperty({ required: false })
    datePublished?: Date;

    @ApiProperty({ required: false })
    link?: string;

    @ApiProperty({ required: false })
    buttonText?: string;

    @ApiProperty()
    createdBy: string;

    @ApiProperty({ required: false })
    updatedBy?: string;

    @ApiProperty({ type: [String] })
    branches: string[];

    @ApiProperty({ required: false })
    commentAdmin?: string;

    @ApiProperty({ required: false })
    startDate?: Date;

    @ApiProperty({ required: false })
    endDate?: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ description: 'Whether the student has viewed this story' })
    isViewed: boolean;

    @ApiProperty({ description: 'Whether the student has pressed the button on this story' })
    isButtonPressed: boolean;
}

export class StoryWithItemsResponseData {
    @ApiProperty({
        type: [MobileStoryItemEntity],
        description: 'Array of story items with their viewed status',
    })
    items: MobileStoryItemEntity[];

    @ApiProperty({ description: 'Whether the student has pressed the button on this story' })
    isButtonPressed: boolean;
}

export class StoryWithItemsResponseEntity {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Story items fetched successfully for mobile' })
    message: string;

    @ApiProperty({ type: StoryWithItemsResponseData })
    data: StoryWithItemsResponseData;
}

export class MobileStoryListResponseEntity {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Stories fetched successfully for mobile' })
    message: string;

    @ApiProperty({ type: [MobileStoryEntity] })
    data: MobileStoryEntity[];
}
