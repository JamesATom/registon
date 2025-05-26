import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
    UniversityApply,
    UniversityApplyDocument,
} from '../../../../shared/models/university-apply.schema';
import { University, UniversityDocument } from '../../../../shared/models/university.schema';
import { HttpStatus } from '@nestjs/common';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class UniversityRepository {
    private readonly logger = new Logger(UniversityRepository.name);

    constructor(
        @InjectModel(UniversityApply.name)
        private readonly universityApplyModel: PaginateModel<UniversityApplyDocument>,
        @InjectModel(University.name)
        private readonly universityModel: PaginateModel<UniversityDocument>,
    ) {}

    async createUniversityApply(data: any, userId: string): Promise<ServiceResponse<any>> {
        try {
            const newUniversityApply = new this.universityApplyModel({
                ...data,
                studentId: userId,
                branchId: userId,
            });

            const savedUniversityApply = await newUniversityApply.save();

            return {
                statusCode: HttpStatus.CREATED,
                message: 'University apply created successfully',
                data: savedUniversityApply,
            };
        } catch (error) {
            this.logger.error(`Failed to create university apply: ${error.message}`);
            return {
                statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    async findAllUniversities(filters: any): Promise<ServiceResponse<any[]>> {
        try {
            const query = {};
            if (filters?.status) {
                query['status'] = filters.status;
            }
            if (filters?.search) {
                query['universityName'] = { $regex: filters.search, $options: 'i' };
            }
            if (filters?.createdBy) {
                query['createdBy'] = filters.createdBy;
            }
            const options = {
                page: filters?.page || 1,
                limit: filters?.limit || 10,
                sort: { createdAt: -1 },
            };
            const universitiesResult = await this.universityModel.paginate(query, options);
            const { docs, ...pagination } = universitiesResult;

            return {
                statusCode: HttpStatus.OK,
                message: 'Universities found successfully',
                data: docs,
                pagination,
            };
        } catch (error) {
            this.logger.error(`Failed to find universities: ${error.message}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find universities: ${error.message}`,
            };
        }
    }

    async findUniversityById(id: string): Promise<ServiceResponse<any>> {
        try {
            const university = await this.universityModel.findById(id);
            if (!university) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'University found successfully',
                data: university,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find university: ${error.message}`,
            };
        }
    }

    async getMyApplies(userId: string): Promise<ServiceResponse<any[]>> {
        try {
            const universityApplies = await this.universityApplyModel.find({ studentId: userId });
            if (!universityApplies) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University applies not found',
                };
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'University applies found successfully',
                data: universityApplies,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find university applies: ${error.message}`,
            };
        }
    }

    async getOneApply(id: string, userId: string): Promise<ServiceResponse<any>> {
        try {
            const universityApply = await this.universityApplyModel.findById(id);
            if (!universityApply) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University apply not found',
                };
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'University apply found successfully',
                data: universityApply,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find university apply: ${error.message}`,
            };
        }
    }
}
