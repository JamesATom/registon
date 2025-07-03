// story.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class StoryItemEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  storyId: string;

  @ApiProperty({ example: 'Story item title', required: false })
  title?: string;

  @ApiProperty({ example: 'Detailed description of the story item', required: false })
  description?: string;

  @ApiProperty({ example: 'https://example.com/story-item-image.jpg' })
  image: string;

  @ApiProperty({ example: 1 })
  orderNumber: number;
}

export class StoryEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
  thumbnail: string;

  @ApiProperty({ example: 'https://example.com/link', required: false })
  link?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  branch: string;

  @ApiProperty({ example: 'Admin comment about the story', required: false })
  commentAdmin?: string;

  @ApiProperty({ example: 'Story Title' })
  title: string;

  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'PUBLISHED'] })
  status: 'DRAFT' | 'PUBLISHED';

  @ApiProperty({ example: '2023-07-01T10:00:00Z', required: false })
  publishedAt?: Date;

  @ApiProperty({ example: 'Read More', required: false })
  buttonText?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  createdBy: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003', required: false })
  updatedBy?: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;
}

export class StoryWithItemsEntity extends StoryEntity {
  @ApiProperty({ type: [StoryItemEntity], required: false })
  items?: StoryItemEntity[];
}
