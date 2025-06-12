// mock-register.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';

@Injectable()
export class MockRegisterRepository extends BaseRepository<any> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma.mockRegistration);
    }

    async create(data: any): Promise<any> {
        const existingBranch = await this.prisma.branch.findUnique({
            where: { id: data.branch },
        });

        if (!existingBranch) {
            await this.prisma.branch.create({
                data: {
                    id: data.branch, 
                    branchName: data.branchName,
                    isActive: true,
                },
            });
        }
        const mockRegistration = await this.prisma.mockRegistration.create({
            data: {
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                commentAdmin: data.commentAdmin,
                title: data.title,
                date: new Date(data.date),
                branchId: data.branch,
                isActive: data.isActive ?? true,
            },
            include: {
                branch: true,
            },
        });

        return mockRegistration;
    }

    async getAll(): Promise<any> {
        return this.prisma.mockRegistration.findMany({
            include: {
                branch: true,
                students: true
            },
            where: {
                isActive: true
            }
        });
    }

    async getOne(id: string): Promise<any> {
        return this.prisma.mockRegistration.findUnique({
            where: { id },
            include: {
                branch: true,
                students: true
            }
        });
    }

    async update(id: string, data: any): Promise<any> {
        return this.prisma.mockRegistration.update({
            where: { id },
            data: {
                updatedBy: data.updatedBy,
                commentAdmin: data.commentAdmin,
                title: data.title,
                date: new Date(data.date),
                branchId: data.branch,
                isActive: data.isActive
            },
            include: {
                branch: true,
                students: true
            }
        });
    }

    async delete(id: string): Promise<any> {
        const mockRegistration = await this.prisma.mockRegistration.findUnique({
            where: { id },
            include: {
                students: true
            }
        });
        
        if (!mockRegistration) {
            throw new RpcException({
                statusCode: 404,
                message: 'Mock registration not found'
            });
        }
        
        return this.prisma.$transaction(async (tx) => {
            if (mockRegistration.students.length > 0) {
                await tx.mockRegistrationStudent.deleteMany({
                    where: { mockRegistrationId: id }
                });
            }
            
            return tx.mockRegistration.delete({
                where: { id }
            });
        });
    }

    async registerStudent(mockRegistrationId: string, studentId: string): Promise<any> {
        const mockRegistration = await this.prisma.mockRegistration.findUnique({
            where: { id: mockRegistrationId },
            include: {
                students: true
            }
        });
        
        if (!mockRegistration) {
            throw new RpcException({
                statusCode: 404,
                message: 'Mock registration not found'
            });
        }
        
        const existingRegistration = await this.prisma.mockRegistrationStudent.findUnique({
            where: {
                studentId_mockRegistrationId: {
                    studentId,
                    mockRegistrationId
                }
            }
        });
        
        if (existingRegistration) {
            throw new RpcException({
                statusCode: 400,
                message: 'Student is already registered for this mock exam'
            });
        }
        
        return this.prisma.mockRegistrationStudent.create({
            data: {
                mockRegistrationId,
                studentId
            }
        });
    }
    
    async unregisterStudent(mockRegistrationId: string, studentId: string): Promise<any> {
        const registration = await this.prisma.mockRegistrationStudent.findUnique({
            where: {
                studentId_mockRegistrationId: {
                    studentId,
                    mockRegistrationId
                }
            }
        });
        
        if (!registration) {
            throw new RpcException({
                statusCode: 404,
                message: 'Student is not registered for this mock exam'
            });
        }
        
        return this.prisma.mockRegistrationStudent.delete({
            where: {
                studentId_mockRegistrationId: {
                    studentId,
                    mockRegistrationId
                }
            }
        });
    }
}
