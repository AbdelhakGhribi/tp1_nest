import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OPERATIONS } from './cv.events';
import { HistoryEntity } from 'src/history/entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvListener {
  constructor(private readonly historyRepository: Repository<HistoryEntity>) {
  }

  @OnEvent(OPERATIONS.CV_ADD)
  async handleCreation(payload: any) {
    console.log("kotkot")
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
    console.log('kotkot');
    let result = await this.historyRepository.save({
      action: action, user: payload.user, cv: payload.cv,
    });
    return result;
  }
}
