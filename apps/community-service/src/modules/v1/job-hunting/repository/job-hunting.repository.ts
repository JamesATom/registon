// job-hunting.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { FilterJobHuntingDto } from '../dto/filter-job-hunting.dto';

@Injectable()
export class JobHuntingRepository extends BaseRepository<any> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma.jobHunting);
    }

    async create(createJobHuntingDto: CreateJobHuntingDto): Promise<any> {
        try {
            return await this.prisma.jobHunting.create({
                data: {
                    ...createJobHuntingDto,
                },
                include: {
                    company: true,
                    city: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }

    async getAll(): Promise<any> {
        try {
            return await this.prisma.jobHunting.findMany({
                include: {
                    company: true,
                    city: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }

    async getOne(id: string): Promise<any> {
        try {
            const jobHunting = await this.prisma.jobHunting.findUnique({
                where: { id },
                include: {
                    company: true,
                    city: true,
                },
            });

            if (!jobHunting) {
                throw new RpcException({
                    message: `Job listing with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            return jobHunting;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }

    async update(id: string, updateJobHuntingDto: UpdateJobHuntingDto): Promise<any> {
        try {
            // Check if job hunting exists
            const existingJobHunting = await this.prisma.jobHunting.findUnique({
                where: { id },
            });

            if (!existingJobHunting) {
                throw new RpcException({
                    message: `Job listing with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            return await this.prisma.jobHunting.update({
                where: { id },
                data: updateJobHuntingDto,
                include: {
                    company: true,
                    city: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            // Check if job hunting exists
            const existingJobHunting = await this.prisma.jobHunting.findUnique({
                where: { id },
            });

            if (!existingJobHunting) {
                throw new RpcException({
                    message: `Job listing with ID ${id} not found`,
                    statusCode: 404,
                });
            }

            return await this.prisma.jobHunting.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }

    async filter(filterDto: FilterJobHuntingDto): Promise<any> {
        try {
            const {
                searchTerm,
                workExperience,
                cityId,
                companyId,
                workScheduleHours,
                employmentType,
                workMode,
                minSalary,
                maxSalary,
            } = filterDto;

            // Build filter conditions
            const where: any = {};

            if (searchTerm) {
                where.OR = [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { responsibilities: { contains: searchTerm, mode: 'insensitive' } },
                    { requirements: { contains: searchTerm, mode: 'insensitive' } },
                    { conditions: { contains: searchTerm, mode: 'insensitive' } },
                ];
            }

            if (workExperience) {
                where.workExperience = workExperience;
            }

            if (cityId) {
                where.cityId = cityId;
            }

            if (companyId) {
                where.companyId = companyId;
            }

            if (workScheduleHours) {
                where.workScheduleHours = workScheduleHours;
            }

            if (employmentType) {
                where.employmentType = employmentType;
            }

            if (workMode) {
                where.workMode = workMode;
            }

            // Salary range filter
            if (minSalary !== undefined || maxSalary !== undefined) {
                where.salary = {};

                if (minSalary !== undefined) {
                    where.salary.gte = minSalary;
                }

                if (maxSalary !== undefined) {
                    where.salary.lte = maxSalary;
                }
            }

            return await this.prisma.jobHunting.findMany({
                where,
                include: {
                    company: true,
                    city: true,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new RpcException({
                    message: 'Database error occurred',
                    statusCode: 500,
                });
            }
            throw error;
        }
    }
}
