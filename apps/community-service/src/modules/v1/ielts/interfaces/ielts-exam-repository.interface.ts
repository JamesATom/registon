import { PaginateOptions } from 'mongoose';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { FindIeltsExamsDto } from '../dto/find-ielts-exams.dto';

export interface IIeltsExamRepository {
    findAll(filterDto: FindIeltsExamsDto, options: PaginateOptions): Promise<ServiceResponse<any>>;
    buildQuery(filterDto: FindIeltsExamsDto): any;
    findById(id: string): Promise<ServiceResponse<any>>;
    create(data: any): Promise<ServiceResponse<any>>;
    update(id: string, data: any): Promise<ServiceResponse<any>>;
    delete(id: string): Promise<ServiceResponse<boolean>>;
}
