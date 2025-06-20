import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from 'src/common/prisma/client/v1';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { CreateUniversitySearchDto } from '../dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from '../dto/update-university-search.dto';
import { FilterUniversitySearchDto } from '../dto/filter-university-search.dto';

@Injectable()
export class UniversitySearchRepository extends BaseRepository<any> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma.university);
    }

    async create(createUniversitySearchDto: CreateUniversitySearchDto): Promise<any> {
        // Remove study languages and types until schema is updated
        const { cityId, certificateRequirementId, studyLanguages, studyTypes, ...otherData } =
            createUniversitySearchDto;
        console.log('Creating university with data:', createUniversitySearchDto);
        // return this.prisma.university.create({
        //     data: {
        //         ...otherData,
        //         city: cityId ? { connect: { id: cityId } } : undefined,
        //         certificateRequirement: certificateRequirementId ?
        //             { connect: { id: certificateRequirementId } } : undefined,
        //         // Ignoring studyLanguages and studyTypes until schema is updated
        //     },
        //     include: {
        //         city: true,
        //         certificateRequirement: true,
        //         programs: true,
        //         faculties: true,
        //     },
        // });
    }

    async getAll(): Promise<any> {
        return this.prisma.university.findMany({
            include: {
                city: true,
                certificateRequirement: true,
                programs: true,
                faculties: true,
            },
        });
    }

    async getOne(id: string): Promise<any> {
        const university = await this.prisma.university.findUnique({
            where: { id },
            include: {
                city: true,
                certificateRequirement: true,
                programs: true,
                faculties: true,
            },
        });

        if (!university) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        return university;
    }

    async update(id: string, updateUniversitySearchDto: UpdateUniversitySearchDto): Promise<any> {
        // Remove study languages and types until schema is updated
        const { cityId, certificateRequirementId, studyLanguages, studyTypes, ...otherData } =
            updateUniversitySearchDto;

        const existingUniversity = await this.prisma.university.findUnique({
            where: { id },
        });

        if (!existingUniversity) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        const updateData: any = { ...otherData };

        if (cityId !== undefined) {
            updateData.city = { connect: { id: cityId } };
        }

        if (certificateRequirementId !== undefined) {
            updateData.certificateRequirement = { connect: { id: certificateRequirementId } };
        }

        // Ignoring studyLanguages and studyTypes until schema is updated

        return this.prisma.university.update({
            where: { id },
            data: updateData,
            include: {
                city: true,
                certificateRequirement: true,
                programs: true,
                faculties: true,
            },
        });
    }

    async delete(id: string): Promise<any> {
        const existingUniversity = await this.prisma.university.findUnique({
            where: { id },
        });

        if (!existingUniversity) {
            throw new RpcException({
                message: `University with ID ${id} not found`,
                statusCode: 404,
            });
        }

        return this.prisma.university.delete({
            where: { id },
        });
    }

    async filter(filterDto: FilterUniversitySearchDto): Promise<any> {
        const { searchTerm, type, cityId, certificateRequirementId } = filterDto;

        // Build filter conditions
        const where: any = {};

        if (searchTerm) {
            where.OR = [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
            ];
        }

        if (type) {
            where.type = type;
        }

        if (cityId) {
            where.cityId = cityId;
        }

        if (certificateRequirementId) {
            where.certificateRequirementId = certificateRequirementId;
        }

        // For now, we'll ignore the study languages and types filters until schema is updated
        return this.prisma.university.findMany({
            where,
            include: {
                city: true,
                certificateRequirement: true,
                programs: true,
                faculties: true,
            },
        });
    }
}
