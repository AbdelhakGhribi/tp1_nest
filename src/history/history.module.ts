import { Module } from '@nestjs/common';
import { CvHistoryService } from './history.service';
import { CvHistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from './entities/history.entity';
import { CvListener } from 'src/SseEv/cv.listener';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [CvHistoryController],
  providers: [CvHistoryService, CvListener],
  exports: [CvListener],
})
export class CvHistoryModule {}
