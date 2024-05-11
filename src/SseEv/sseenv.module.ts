import {Module } from '@nestjs/common';
import { SseService } from './sseenv.service';

@Module({
  providers: [SseService],
  exports: [SseService],
})
export class SseEnvModule {}