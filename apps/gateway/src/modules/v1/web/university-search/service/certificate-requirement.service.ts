// certificate-requirement.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateCertificateRequirementDto } from '../dto/create-certificate-requirement.dto';
import { UpdateCertificateRequirementDto } from '../dto/update-certificate-requirement.dto';

@Injectable()
export class CertificateRequirementService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createCertificateRequirementDto: CreateCertificateRequirementDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CertificateRequirement.CREATE, { 
                    ...createCertificateRequirementDto,
                    createdBy: userId,
                    updatedBy: userId
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to create certificate requirement',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CertificateRequirement.GET_ALL, {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching certificate requirements:', error);
                        throw new HttpException(
                            'Failed to fetch certificate requirements',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CertificateRequirement.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching certificate requirement:', error);
                        throw new HttpException(
                            'Failed to fetch certificate requirement',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateCertificateRequirementDto: UpdateCertificateRequirementDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CertificateRequirement.UPDATE, { 
                    id, 
                    updateCertificateRequirementDto: {
                        ...updateCertificateRequirementDto,
                        updatedBy: userId
                    }
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to update certificate requirement',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CertificateRequirement.DELETE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to delete certificate requirement',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
