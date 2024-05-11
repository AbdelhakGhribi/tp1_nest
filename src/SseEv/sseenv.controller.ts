import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable, fromEvent, map, filter } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtAuthGuard } from 'src/authentication/Guards/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { CvEntity } from 'src/cvs/entities/cv.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('sse')
@UseGuards(JwtAuthGuard)
export class SseController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse()
  sse(@User() SubscribedUser: UserEntity): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, `${CvEntity}.*`).pipe(
      filter((event: any) => {
        return (
          SubscribedUser.role === "admin" ||
          SubscribedUser.id === event.cv.user.id
        );
      }),
      map((event: any) => {
        return new MessageEvent(`${CvEntity}.notification`, {
          data: event,
        });
      }),
    );
  }
}