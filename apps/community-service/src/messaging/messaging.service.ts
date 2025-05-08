import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class MessagingService {
    constructor(@Inject('MESSAGING_SERVICE') private readonly client: ClientProxy) {}

    send<TResult = any, TInput = any>(pattern: string, data: TInput): Observable<TResult> {
        return this.client.send<TResult, TInput>(pattern, data);
    }
    async sendAndReceive<TResult = any, TInput = any>(
        pattern: string,
        data: TInput,
    ): Promise<TResult> {
        return firstValueFrom(this.client.send<TResult, TInput>(pattern, data));
    }

    emit<TInput = any>(pattern: string, data: TInput): void {
        this.client.emit<any, TInput>(pattern, data);
    }
}
