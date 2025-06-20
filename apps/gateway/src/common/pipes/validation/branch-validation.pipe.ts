// branch-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ExternalService } from 'src/modules/v1/shared/external/external.service';

@Injectable()
export class BranchValidationPipe implements PipeTransform {
    constructor(private readonly externalService: ExternalService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const { branch, ...newValue } = value;

        if (!value || !value.branch) {
            return value;
        }

        const branchesResponse = await this.externalService.getBranchList();

        if (!branchesResponse?.data || !Array.isArray(branchesResponse.data)) {
            throw new HttpException(
                'Failed to fetch branch list',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        
        const foundBranch = branchesResponse.data.find(
            branch => branch._id === value.branch
        );

        if (!foundBranch) {
            throw new HttpException(
                'Branch not found',
                HttpStatus.BAD_REQUEST
            );
        }

        return {
            ...newValue,
            branchId: foundBranch._id,
        };
    }
}