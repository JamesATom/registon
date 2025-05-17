// external.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalService {
    private readonly API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;
    private readonly logger = new Logger(ExternalService.name);

    constructor() {}

    async getBranchList(): Promise<any> {
        const url = `${this.API_URL}/branches`;

        try {
            this.logger.log(`Fetching branch list from URL: ${url}`);

            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.REGISTON_TOKEN_ABDULAZIZ_TEST}`,
                    'branch': process.env.REGISTON_ORGANIZATION_KEY || '67cd920149f3fde12ca1a7c5',
                },
            });

            this.logger.debug('Response from branch list:', response.data);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching branch list', error?.response?.data || error.message);
        }
    }
}
