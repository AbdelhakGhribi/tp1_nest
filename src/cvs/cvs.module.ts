import { Module, Sse } from '@nestjs/common';
import { CvsService } from './cvs.service';
import {CvsController, CvsControllerV2} from './cvs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CvEntity} from "./entities/cv.entity";
import {UserEntity} from "../users/entities/user.entity";
import { SseService } from 'src/SseEv/sseenv.service';

@Module({
  controllers: [CvsController,CvsControllerV2],
  providers: [CvsService,SseService],
  imports:[TypeOrmModule.forFeature(
      [CvEntity,UserEntity]
  )]
})
export class CvsModule {}
