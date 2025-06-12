// mock-register.controller.ts
import { Controller, Get, Post, Body, Put, Req, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { MockRegisterService } from '../service/mock-register.service';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from '../dto/update-mock-register.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Mock Register')
@Controller('mock-register/web')
export class MockRegisterController {
    constructor(private readonly mockRegisterService: MockRegisterService) {}

    @Post()
    @ApiCreate('Mock Registration', CommonEntity)
    @ApiBody({ type: CreateMockRegisterDto })
    async create(@Body(BranchValidationPipe) createMockRegisterDto: CreateMockRegisterDto, @Req() req: CustomRequest) {
        return this.mockRegisterService.create(createMockRegisterDto, req?.user);
    }

    @Get(':id')
    @ApiGetOne('Mock Registration')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.mockRegisterService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Mock Registration', CommonEntity)
    @ApiBody({ type: UpdateMockRegisterDto })
    async update(
        @Param('id') id: string,
        @Body(BranchValidationPipe) updateMockRegisterDto: UpdateMockRegisterDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.mockRegisterService.update(id, updateMockRegisterDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('Mock Registration')
    @ApiOkResponse({ type: CommonEntity })
    async remove(@Param('id') id: string): Promise<CommonEntity> {
        return this.mockRegisterService.delete(id);
    }
}
