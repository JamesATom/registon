// import {
//     IsNotEmpty,
//     IsString,
//     IsOptional,
//     IsNumber,
//     IsMongoId,
//     ValidateNested,
//     IsArray,
// } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Type } from 'class-transformer';

// // Hikoya elementi tarkibi uchun model

// export class StoryItemContent {
//     // Hikoya elementi sarlavhasi
//     @ApiProperty({ description: 'Title of the story item', maxLength: 100 })
//     @IsNotEmpty()
//     @IsString()
//     title: string;

//     // Hikoya elementi tavsifi (ixtiyoriy)
//     @ApiPropertyOptional({
//         description: 'Description of the story item',
//         maxLength: 250,
//     })
//     @IsOptional()
//     @IsString()
//     description?: string;

//     // Hikoya elementi uchun rasm
//     @ApiProperty({ description: 'Image path/URL for the story item' })
//     @IsNotEmpty()
//     @IsString()
//     image: string;

//     // Tartiblash raqami (ixtiyoriy)
//     @ApiPropertyOptional({
//         description: 'Order number for sorting items within a story',
//         default: 0,
//     })
//     @IsOptional()
//     @IsNumber()
//     orderNumber?: number;
// }

// export class CreateStoryItemDto {
//     // Asosiy hikoya ID raqami
//     @ApiProperty({ description: 'ID of the parent story' })
//     @IsNotEmpty()
//     @IsMongoId()
//     storyId: string;

//     // Hikoya elementlari ro'yxati
//     @ApiProperty({
//         description: 'Story item content',
//         type: [StoryItemContent],
//         isArray: true,
//     })
//     @IsNotEmpty()
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => StoryItemContent)
//     storyItems: StoryItemContent[];
// }
