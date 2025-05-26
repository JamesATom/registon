import { Injectable, Logger } from '@nestjs/common';
import mongoose, { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { University, UniversityDocument } from '../../../shared/models/university.schema';
import { HttpStatus } from '@nestjs/common';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';

@Injectable()
export class UniversityRepository {
    private readonly logger = new Logger(UniversityRepository.name);

    constructor(
        @InjectModel(University.name)
        private readonly universityModel: PaginateModel<UniversityDocument>,
    ) {}

    async createUniversity(universityData: any, userId: string): Promise<ServiceResponse<any>> {
        try {
            const newUniversity = new this.universityModel({
                ...universityData,
                createdBy: userId,
            });

            const savedUniversity = await newUniversity.save();

            return {
                statusCode: HttpStatus.CREATED,
                message: 'University created successfully',
                data: savedUniversity,
            };
        } catch (error) {
            this.logger.error(`Failed to create university: ${error.message}`);
            return {
                statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
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

    async updateUniversity(
        id: string,
        updateData: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        try {
            const university = await this.universityModel.findById(id);
            if (!university) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }
            const updatedUniversity = await this.universityModel.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'University updated successfully',
                data: updatedUniversity,
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update university: ${error.message}`,
            };
        }
    }
    async removeUniversity(id: string): Promise<ServiceResponse<any>> {
        try {
            const university = await this.universityModel.findByIdAndDelete(id);

            if (!university) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'University removed successfully',
                data: !!university,
            };
        } catch (error) {
            this.logger.error(`Failed to remove university: ${error.message}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to remove university: ${error.message}`,
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

    async addProgram(programData: any, userId: string): Promise<ServiceResponse<any>> {
        try {
            const university = await this.universityModel.findById(programData.universityId);
            if (!university) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }
            delete programData.universityId;
            university.programs.push(programData);
            await university.save();
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Program created successfully',
                data: university.programs,
            };
        } catch (error) {
            this.logger.error(`Failed to create program: ${error.message}`);
            return {
                statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    async updateProgram(id: string, updateData: any): Promise<ServiceResponse<any>> {
        try {
            // Find the university containing the program
            const updatedProgram: any = await this.universityModel.findById(
                updateData.universityId,
            );

            if (!updatedProgram) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }

            // Find the program by ID in the programs array
            const program = updatedProgram.programs.find((p: any) => p._id.toString() === id);

            if (!program) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Program not found',
                };
            }

            // Update only the fields provided in updateData
            Object.assign(program, updateData);

            // Mark the programs array as modified to ensure Mongoose saves the changes
            updatedProgram.markModified('programs');

            // Save the updated university document
            await updatedProgram.save();

            return {
                statusCode: HttpStatus.OK,
                message: 'Program updated successfully',
                data: program, // Return the updated program instead of the entire university
            };
        } catch (error) {
            this.logger.error(`Failed to update program: ${error.message}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An error occurred while updating the program',
            };
        }
    }

    async removeProgram(id: string, universityId: string): Promise<ServiceResponse<any>> {
        try {
            console.log('universityId', universityId);
            console.log('id', id);

            const university = await this.universityModel.findById(universityId);
            if (!university) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }
            const updateResult: any = await this.universityModel.findOneAndUpdate(
                { _id: universityId },
                { $pull: { programs: { _id: id } } },
                { new: true },
            );

            if (!updateResult) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'University not found',
                };
            }

            const programStillExists = updateResult.programs.some(
                (p: any) => p._id.toString() === id,
            );

            if (programStillExists) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Program not found',
                };
            }

            return {
                statusCode: HttpStatus.OK,
                message: 'Program removed successfully',
                data: { deletedProgramId: id },
            };
        } catch (error) {
            this.logger.error(
                `Failed to remove program with ID ${id} from university ${universityId}: ${error.message}`,
            );
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'An error occurred while removing the program',
            };
        }
    }
}
