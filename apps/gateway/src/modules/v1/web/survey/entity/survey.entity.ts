// survey.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class SurveyQuestionEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  surveyId: string;

  @ApiProperty({ example: 'What is your opinion about our service?' })
  question: string;

  @ApiProperty({ example: 'Please provide your honest feedback', required: false })
  description?: string;

  @ApiProperty({ example: 'Excellent' })
  answer1: string;

  @ApiProperty({ example: 'Good' })
  answer2: string;

  @ApiProperty({ example: 'Average', required: false })
  answer3?: string;

  @ApiProperty({ example: 'Below Average', required: false })
  answer4?: string;

  @ApiProperty({ example: 'Poor', required: false })
  answer5?: string;

  @ApiProperty({ example: 10 })
  answer1Qty: number;

  @ApiProperty({ example: 15 })
  answer2Qty: number;

  @ApiProperty({ example: 8 })
  answer3Qty: number;

  @ApiProperty({ example: 5 })
  answer4Qty: number;

  @ApiProperty({ example: 2 })
  answer5Qty: number;
}

export class SurveyParticipantEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  surveyId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  userId: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  takenAt: Date;
}

export class SurveyEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  createdBy: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
  updatedBy?: string;

  @ApiProperty({ example: 'https://example.com/survey-image.jpg' })
  image: string;

  @ApiProperty({ example: 'Admin comment about the survey', required: false })
  commentAdmin?: string;

  @ApiProperty({ example: 'Customer Satisfaction Survey' })
  title: string;

  @ApiProperty({ example: 'Help us improve our services', required: false })
  description?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
  branch: string;

  @ApiProperty({ example: 'ALL', enum: ['ALL', 'TEACHER', 'STUDENT'] })
  targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;
}

export class SurveyWithQuestionsEntity extends SurveyEntity {
  @ApiProperty({ type: [SurveyQuestionEntity] })
  questions: SurveyQuestionEntity[];
}

export class SurveyResponseEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  surveyId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  userId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        questionId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174002' },
        answerIndex: { type: 'number', example: 1 }
      }
    }
  })
  responses: {
    questionId: string;
    answerIndex: number;
  }[];
}
