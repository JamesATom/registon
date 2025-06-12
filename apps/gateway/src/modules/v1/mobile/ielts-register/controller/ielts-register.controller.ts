// ielts-register.controller.ts
import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiGetAll } from 'src/common/swagger/common-swagger';
import { IeltsRegisterService } from '../service/ielts-register.service';
import { RegisterForIeltsDto } from '../dto/register-for-ielts.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Mobile - IELTS Register')
@Controller('ielts-register/mobile')
export class IeltsRegisterController {
    constructor(private readonly ieltsRegisterService: IeltsRegisterService) {}

    @Get()
    @ApiGetAll('IELTS Registration', CommonEntity)
    @ApiOkResponse({ type: [CommonEntity] })
    async getAll() {
        return this.ieltsRegisterService.getAll();
    }

    @Get(':id')
    @ApiGetOne('IELTS Registration')
    @ApiOkResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.ieltsRegisterService.getOne(id);
    }
    
    @Post('register')
    @ApiOkResponse({ type: CommonEntity })
    @ApiBody({ type: RegisterForIeltsDto })
    async registerForIelts(@Body() registerForIeltsDto: RegisterForIeltsDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.ieltsRegisterService.registerForExam(registerForIeltsDto.ieltsExamId, req.user);
    }
    
    @Post('unregister')
    @ApiOkResponse({ type: CommonEntity })
    @ApiBody({ type: RegisterForIeltsDto })
    async unregisterFromIelts(@Body() registerForIeltsDto: RegisterForIeltsDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.ieltsRegisterService.unregisterFromExam(registerForIeltsDto.ieltsExamId, req.user);
    }
}
