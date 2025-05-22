import { IsNotEmpty, IsString } from 'class-validator';

export class TrackStoryButtonDto {
    @IsString()
    @IsNotEmpty()
    storyId: string;
}

export class TrackStoryItemsDto {
    @IsString()
    @IsNotEmpty()
    storyId: string;

    @IsString()
    @IsNotEmpty()
    storyItemId: string;
}
