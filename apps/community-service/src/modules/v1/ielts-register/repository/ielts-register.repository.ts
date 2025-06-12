// ielts-register.repository.ts
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';

@Injectable()
export class IeltsRegisterRepository extends BaseRepository<Prisma.IeltsRegistrationDelegate> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma.ieltsRegistration);
    }

    async create(data: any): Promise<any> {
        const calendar = await this.prisma.ieltsCalendar.create({
            data: {
                examDate: new Date(data.examDate),
                cityId: data.cityId,
                isAvailable: true
            }
        });
        
        return this.prisma.ieltsExam.create({
            data: {
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                dateExam: new Date(data.examDate),
                cityId: data.cityId,
                calendarId: calendar.id,
                commentAdmin: data.commentAdmin
            }
        });
    }

    async getAll(): Promise<any> {
        return this.prisma.ieltsExam.findMany({
            include: {
                calendar: true,
                city: true,
            }
        });
    }

    async getOne(id: string): Promise<any> {
        return this.prisma.ieltsExam.findUnique({
            where: { id },
            include: {
                calendar: true,
                city: true,
            }
        });
    }

    async update(id: string, data: any): Promise<any> {
        return this.prisma.ieltsExam.update({
            where: { id },
            data: {
                updatedBy: data.updatedBy,
                dateExam: new Date(data.examDate),
                cityId: data.cityId,
                commentAdmin: data.commentAdmin
            }
        });
    }

    async delete(id: string): Promise<any> {
        const exam = await this.prisma.ieltsExam.findUnique({
            where: { id },
            include: {
                students: true,
                calendar: true
            }
        });
        
        return this.prisma.$transaction(async (tx) => {
            if (exam.students.length > 0) {
                await tx.ieltsRegistration.deleteMany({
                    where: { examId: id }
                });
            }
            
            const deletedExam = await tx.ieltsExam.delete({
                where: { id }
            });
            
            const otherExamsWithSameCalendar = await tx.ieltsExam.count({
                where: {
                    calendarId: exam.calendarId,
                    id: { not: id } 
                }
            });
            
            if (otherExamsWithSameCalendar === 0) {
                await tx.ieltsCalendar.delete({
                    where: { id: exam.calendarId }
                });
            }
            
            return deletedExam;
        });
    }

    async registerForExam(examId: string, studentId: string): Promise<any> {
        await this.prisma.ieltsRegistration.findUnique({
            where: {
                studentId_examId: {
                    studentId,
                    examId,
                },
            },
        });

        const exam = await this.prisma.ieltsExam.findUnique({
            where: { id: examId },
            include: {
                students: true,
                calendar: true,
            },
        });

        if (!exam) {
            throw new RpcException({
                statusCode: 404,
                message: 'Exam not found',
            });
        }

        return this.prisma.ieltsRegistration.create({
            data: {
                examId,
                studentId,
            },
        });
    }
}
