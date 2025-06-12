// city.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Injectable()
export class CityService {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {}

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client.send(MessagePatterns.City.V1.GET_ALL, {})
            .pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error fetching cities:', error);
                    throw new Error('Failed to fetch cities');
                })
            ),
        );
    }
}
