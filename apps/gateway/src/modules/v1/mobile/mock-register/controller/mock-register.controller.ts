// mock-register.controller.ts
import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiGetAll } from 'src/common/swagger/common-swagger';
import { MockRegisterService } from '../service/mock-register.service';
import { RegisterForMockDto } from '../dto/register-for-mock.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - Mock Register')
@Controller('mock-register/mobile')
export class MockRegisterController {
    constructor(private readonly mockRegisterService: MockRegisterService) {}

    @Get()
    @ApiGetAll('Mock Registration', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll() {
        return this.mockRegisterService.getAll();
    }

    @Get(':id')
    @ApiGetOne('Mock Registration')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.mockRegisterService.getOne(id);
    }
    
    @Post('register')
    @ApiOkResponse({ type: CommonEntity })
    @ApiBody({ type: RegisterForMockDto })
    async registerForMock(@Body() registerForMockDto: RegisterForMockDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.mockRegisterService.registerStudent(registerForMockDto.mockRegistrationId, req.user);
    }
    
    // @Post('unregister')
    // @ApiOkResponse({ type: CommonEntity })
    // @ApiBody({ type: RegisterForMockDto })
    // async unregisterFromMock(@Body() registerForMockDto: RegisterForMockDto, @Req() req: CustomRequest): Promise<CommonEntity> {
    //     return this.mockRegisterService.unregisterStudent(registerForMockDto.mockRegistrationId, req.user);
    // }
}
