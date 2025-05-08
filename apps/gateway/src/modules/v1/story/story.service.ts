// story.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
// import { firstValueFrom } from 'rxjs';

@Injectable()
export class StoryService {
    constructor(@Inject('COMMUNITY_SERVICE') private client: ClientProxy) {}

    async getAllStory() {
        // return firstValueFrom(
        //     this.client.send(MessagePatterns.Story.V1.FIND_ALL, { status })
        // );

        return this.client.send(MessagePatterns.Story.V1.GET_ALL, {}).toPromise();
    }
}