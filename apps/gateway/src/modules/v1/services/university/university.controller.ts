import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Request,
    UseGuards,
    Query,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
    ApiAddProgram,
    ApiCreateUniversity,
    ApiDeleteProgram,
    ApiDeleteUniversity,
    ApiFilterUniversities,
    ApiGetUniversityById,
    ApiUpdateProgram,
    ApiUpdateUniversity,
} from './decorators/api-docs.decorators';

import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { FilterUniversitiesDto } from './dto/filter-university.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';

@ApiTags('Universities')
@UseGuards(JwtHttpAuthGuard)
@ApiBearerAuth()
@Controller('universities')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post()
    @ApiCreateUniversity()
    @ApiBody({ type: CreateUniversityDto })
    async createUniversity(@Body() universityData: CreateUniversityDto, @Request() req: any) {
        return this.universityService.createUniversity(universityData, req.user?.userId);
    }

    @Get(':id')
    @ApiGetUniversityById()
    async findUniversityById(@Param('id') id: string) {
        return this.universityService.findUniversityById(id);
    }

    @Put(':id')
    @ApiUpdateUniversity()
    @ApiBody({ type: UpdateUniversityDto })
    async updateUniversity(
        @Param('id') id: string,
        @Body() updateData: UpdateUniversityDto,
        @Request() req: any,
    ) {
        return this.universityService.updateUniversity(id, updateData, req.user?.userId);
    }

    @Delete(':id')
    @ApiDeleteUniversity()
    async removeUniversity(@Param('id') id: string) {
        return this.universityService.removeUniversity(id);
    }

    @Post('filter')
    @ApiFilterUniversities()
    async findAllUniversities(@Body() filters: FilterUniversitiesDto) {
        return this.universityService.findAllUniversities(filters);
    }

    @Post('program')
    @ApiAddProgram()
    @ApiBody({ type: CreateProgramDto })
    async addProgram(@Body() programData: CreateProgramDto, @Request() req: any) {
        return this.universityService.addProgram(programData, req.user?.userId);
    }

    @Put('program/:id')
    @ApiUpdateProgram()
    @ApiBody({ type: UpdateProgramDto })
    async updateProgram(@Param('id') id: string, @Body() updateData: UpdateProgramDto) {
        return this.universityService.updateProgram(id, updateData);
    }

    @Delete('program/:id')
    @ApiDeleteProgram()
    async removeProgram(@Param('id') id: string, @Query('universityId') universityId: string) {
        return this.universityService.removeProgram(id, universityId);
    }
}
