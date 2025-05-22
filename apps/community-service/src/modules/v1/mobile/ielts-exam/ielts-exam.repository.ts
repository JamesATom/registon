import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    IeltsExam,
    IeltsExamDocument,
    IeltsExamStatus,
} from '../../../../shared/models/ielts-exam.schema';
import {
    IeltsRegistration,
    IeltsRegistrationDocument,
} from '../../../../shared/models/ielts-registration.schema';

import { ServiceResponse } from '../../../../common/interfaces/service-response.interface';

@Injectable()
export class MobileIeltsExamRepository {
    constructor(
        @InjectModel(IeltsExam.name) private ieltsExamModel: Model<IeltsExamDocument>,
        @InjectModel(IeltsRegistration.name)
        private ieltsRegistrationModel: Model<IeltsRegistrationDocument>,
    ) {}

    async getAllIeltsExamDays(city: string, examType: string): Promise<ServiceResponse<any[]>> {
        try {
            const query: any = {
                city: city,
                examType: examType,
                examDate: { $gte: new Date() },
                status: IeltsExamStatus.ACTIVE,
            };

            const result = await this.ieltsExamModel
                .find(query)
                .sort({ examDate: 1 })
                .lean()
                .exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'IELTS exam days fetched successfully',
                data: result,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch IELTS exam days: ${errorMessage}`,
            };
        }
    }

    async registerForExam(
        studentInformation: any,
        studentId: string,
    ): Promise<ServiceResponse<any>> {
        try {
            const examExists = await this.ieltsExamModel
                .findOne({
                    _id: studentInformation.examId,
                    status: IeltsExamStatus.ACTIVE,
                    registrationDeadline: { $gte: new Date() },
                })
                .exec();

            if (!examExists) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Exam with ID ${studentInformation.examId} not found`,
                };
            }

            const registrationExists = await this.ieltsRegistrationModel
                .findOne({
                    examId: examExists._id,
                    studentId,
                })
                .exec();

            if (registrationExists) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'You have already registered for this exam',
                };
            }

            const registration = await this.ieltsRegistrationModel.create({
                examId: studentInformation.examId,
                studentId: studentId,
                fullName: studentInformation.fullName,
                phoneNumber: studentInformation.phoneNumber,
                email: studentInformation.email,
                examType: examExists.examType,
                examDate: examExists.examDate,
            });

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Exam registered successfully',
                data: registration,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to register for exam: ${errorMessage}`,
            };
        }
    }

    async getRegistredExams(studentId: string, examType: string): Promise<ServiceResponse<any>> {
        try {
            const result = await this.ieltsRegistrationModel
                .find({ studentId, examType })
                .populate('examId')
                .sort({ examDate: 1 })
                .lean()
                .exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'Registred exams fetched successfully',
                data: result,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch registred exams: ${errorMessage}`,
            };
        }
    }

    async findById(id: string): Promise<ServiceResponse<any>> {
        try {
            const result = await this.ieltsExamModel.findById(id).lean().exec();

            if (!result) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Exam not found',
                };
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'Exam fetched successfully',
                data: result,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch exam: ${errorMessage}`,
            };
        }
    }
}
