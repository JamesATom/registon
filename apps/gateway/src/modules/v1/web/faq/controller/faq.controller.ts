// faq.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FaqService } from '../service/faq.service';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - FAQ')
@Controller('faq/web')
export class FaqController {
    constructor(private readonly faqService: FaqService) {}

    @Get()
    @ApiGetAll('FAQ', CommonEntity)
    @ApiResponse({ type: [CommonEntity] })
    async getAll() {
        return this.faqService.getAll();
    }

    @Post()
    @ApiCreate('FAQ', CommonEntity)
    @ApiBody({ type: CreateFaqDto })
    async create(@Body() createFaqDto: CreateFaqDto, @Req() req: CustomRequest) {
        return this.faqService.create(createFaqDto, req.user.userId);
    }

    @Get(':id')
    @ApiGetOne('FAQ')
    @ApiResponse({ type: CommonEntity })
    async getOne(@Param('id') id: string) {
        return this.faqService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('FAQ', CommonEntity)
    @ApiBody({ type: UpdateFaqDto })
    async update(
        @Param('id') id: string, 
        @Body() updateFaqDto: UpdateFaqDto,
        @Req() req: CustomRequest
    ) {
        return this.faqService.update(id, updateFaqDto, req.user.userId);
    }

    @Delete(':id')
    @ApiDelete('FAQ')
    @ApiResponse({ type: CommonEntity })
    async delete(@Param('id') id: string) {
        return this.faqService.delete(id);
    }
}
