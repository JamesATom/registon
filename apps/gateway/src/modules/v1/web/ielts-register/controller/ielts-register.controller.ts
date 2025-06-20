// ielts-register.controller.ts
import { Controller, Get, Post, Body, Req, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { ApiAuth, ApiGetOne, ApiGetAll, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { IeltsRegisterService } from '../service/ielts-register.service';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from '../dto/update-ielts-register.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - IELTS Register')
@Controller('ielts-register/web')
export class IeltsRegisterController {
    constructor(private readonly ieltsRegisterService: IeltsRegisterService) {}

    @Post()
    @ApiCreate('IELTS Registration', CommonEntity)
    @ApiBody({ type: CreateIeltsRegisterDto })
    async create(
        @Body(CityValidationPipe) createIeltsRegisterDto: CreateIeltsRegisterDto, 
        @Req() req: CustomRequest
    ): Promise<CommonEntity> {
        return this.ieltsRegisterService.create(createIeltsRegisterDto, req?.user);
    }

    @Get()
    @ApiGetAll('IELTS Registration', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll(): Promise<CommonEntity> {
        return this.ieltsRegisterService.getAll();
    }

    @Get(':id')
    @ApiGetOne('IELTS Registration')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string): Promise<CommonEntity> {
        return this.ieltsRegisterService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('IELTS Registration', CommonEntity)
    @ApiBody({ type: UpdateIeltsRegisterDto })
    async update(
        @Param('id') id: string,
        @Body(CityValidationPipe) updateIeltsRegisterDto: UpdateIeltsRegisterDto,
        @Req() req: CustomRequest
    ): Promise<CommonEntity> {
        return this.ieltsRegisterService.update(id, updateIeltsRegisterDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('IELTS Registration')
    @ApiOkResponse({ type: CommonEntity })
    async delete(@Param('id') id: string): Promise<CommonEntity> {
        return this.ieltsRegisterService.delete(id);
    }
}
