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
}

export class MobileStoryWithItemsEntity extends MobileStoryEntity {
    @ApiProperty({ type: [MobileStoryItemEntity] })
    items: MobileStoryItemEntity[];
}

export class MobileStoryListResponseEntity {
    @ApiProperty({ type: [MobileStoryEntity] })
    data: MobileStoryEntity[];
}
