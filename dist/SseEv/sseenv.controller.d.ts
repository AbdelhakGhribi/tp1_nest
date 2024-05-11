import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class SseController {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sse(SubscribedUser: UserEntity): Observable<MessageEvent>;
}
