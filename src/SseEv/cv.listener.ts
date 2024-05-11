import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OPERATIONS } from './cv.events';
import { SseService } from './sseenv.service';
import { HistoryEntity } from 'src/history/entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvListener {
  constructor(private readonly sseService: SseService,
              private readonly historyRepository: Repository<HistoryEntity>
  ) {}
  @OnEvent(OPERATIONS.CV_ADD)
  async handleCreation(payload: any) {
    return await this.handleHistory('CV_ADD', payload);
  }
  @OnEvent(OPERATIONS.CV_UPDATE)
  async handleUpdate(payload: any) {
    return await this.handleHistory('CV_UPDATE', payload);
  }
  @OnEvent(OPERATIONS.CV_DELETE)
  async handleDelete(payload: any) {
    return await this.handleHistory('CV_DELETE', payload);
  }
  async handleHistory(action: string, payload: any) {
    try {
      this.sseService.sendToAdmins({
        actionType: action,
        data: payload,
      });

      this.sseService.sendToSpecificUser(payload.userId, {
        actionType: action,
        data: payload,
      });
    } catch (error) {
      console.log(error);
    }

    let result = await this.historyRepository.save({
      action : action,
      userId: payload.userId,
      cvId: payload.cv.id,
    });

    return result;
  }
}
