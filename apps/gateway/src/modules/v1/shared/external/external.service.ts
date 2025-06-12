// external.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalService {
    private readonly logger = new Logger(ExternalService.name);
    private readonly API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;
    private readonly SUPERADMIN_TOKEN = process.env.REGISTON_TOKEN_SUPERADMIN_TEST;
    private readonly ADMIN_TOKEN = process.env.REGISTON_TOKEN_ABDULAZIZ_TEST;
    private readonly ORGANIZATION = process.env.REGISTON_ORGANIZATION;

    constructor() {}

    async getBranchList(token?: string): Promise<any> {
        const url = `${this.API_URL}/branches`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.SUPERADMIN_TOKEN}`,
            organization: this.ORGANIZATION,
        };

        try {
            return axios.get(url, { headers: headers }).then(response => response.data);
        } catch (error: any) {
            this.logger.error('Error fetching branch list', error?.response?.data || error.message);
        }
    }

    async getCourseList(token: string, limit = 10, page = 1): Promise<any> {
        const url = `${this.API_URL}/courses-pagin`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${this.SUPERADMIN_TOKEN}`,
            organization: this.ORGANIZATION,
            branch: 'registan',
        };
        const params = { limit, page };
        try {
            const response = await axios.post(
                url,
                {}, // empty body
                { headers, params },
            );
            this.logger.log('Course list fetched successfully', response.data);
            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching course list', error?.response?.data || error.message);
        }
        return null;
    }
}
