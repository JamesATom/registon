// city.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CityRepository extends BaseRepository<Prisma.IeltsRegistrationDelegate> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma.ieltsRegistration);
    }

    async getAll(): Promise<any> {
        return this.prisma.city.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }
}
