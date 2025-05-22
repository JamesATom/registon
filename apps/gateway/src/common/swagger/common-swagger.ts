// common-swagger.ts
import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiResponse,
    ApiOperation,
    ApiBearerAuth,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';
import { CommonEntity } from '../libs/common.entity';

const CommonSuccessResponse = (
    status: number,
    message: string,
    model?: Type<any>,
    isArray = false,
) => {
    const decorators = [];

    if (model) {
        decorators.push(
            ApiExtraModels(CommonEntity, model),
            ApiResponse({
                status,
                description: message,
                schema: {
                    allOf: [
                        {
                            $ref: getSchemaPath(CommonEntity),
                        },
                        {
                            properties: {
                                statusCode: { type: 'number', example: status },
                                message: { type: 'string', example: message },
                                data: isArray
                                    ? {
                                          type: 'array',
                                          items: { $ref: getSchemaPath(model) },
                                      }
                                    : {
                                          $ref: getSchemaPath(model),
                                      },
                            },
                        },
                    ],
                },
            }),
        );
    } else {
        decorators.push(
            ApiResponse({
                status,
                description: message,
                schema: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', example: status },
                        message: { type: 'string', example: message },
                        data: { type: 'object', example: {} },
                    },
                },
            }),
        );
    }

    return applyDecorators(...decorators);
};

const CommonErrorResponse = (status: number, message: string) =>
    ApiResponse({
        status,
        description: message,
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: status },
                message: { type: 'string', example: message },
                data: { type: 'object', example: {} },
            },
        },
    });

// 🔐 Auth
export const ApiAuth = () =>
    applyDecorators(
        ApiBearerAuth('JWT'),
        CommonErrorResponse(401, 'Unauthorized access'),
        CommonErrorResponse(403, 'Forbidden'),
    );

// 🚫 Error handlers
export const ApiUnauthorizedResponse = () =>
    CommonErrorResponse(401, 'Unauthorized access');

export const ApiForbiddenResponse = () =>
    CommonErrorResponse(403, 'Forbidden');

export const ApiNotFoundResponse = (entity: string) =>
    CommonErrorResponse(404, `${entity} with ID not found`);

export const ApiConflictResponse = (message: string) =>
    CommonErrorResponse(409, message);

export const ApiInternalServerErrorResponse = (message: string) =>
    CommonErrorResponse(500, message);

// 🧱 CRUD decorators
export const ApiGetAll = (entity: string, model: Type<any>) =>
    applyDecorators(
        ApiOperation({ summary: `Get all ${entity}s` }),
        CommonSuccessResponse(200, `List of ${entity}s`, model, true),
        ApiInternalServerErrorResponse(`Failed to fetch ${entity}s`),
    );

export const ApiGetOne = (entity: string) =>
    applyDecorators(
        ApiOperation({ summary: `Get ${entity} by ID` }),
        CommonSuccessResponse(200, `${entity} details`),
        ApiNotFoundResponse(entity),
        ApiInternalServerErrorResponse(`Failed to fetch ${entity} details`),
    );

export const ApiCreate = (entity: string, model?: Type<any>) =>
    applyDecorators(
        ApiOperation({ summary: `Create ${entity}` }),
        CommonSuccessResponse(201, `${entity} created successfully`, model),
        ApiInternalServerErrorResponse(`Failed to create ${entity}`),
    );

export const ApiUpdate = (entity: string, model: Type<any>) =>
    applyDecorators(
        ApiOperation({ summary: `Update ${entity}` }),
        CommonSuccessResponse(200, `${entity} updated successfully`, model),
        ApiNotFoundResponse(entity),
        ApiInternalServerErrorResponse(`Failed to update ${entity}`),
    );

export const ApiDelete = (entity: string) =>
    applyDecorators(
        ApiOperation({ summary: `Delete ${entity}` }),
        CommonSuccessResponse(200, `${entity} deleted successfully`),
        ApiNotFoundResponse(entity),
        ApiInternalServerErrorResponse(`Failed to delete ${entity}`),
    );
