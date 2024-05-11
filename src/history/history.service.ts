import { Injectable } from '@nestjs/common';
import { cvHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class CvHistoryService {
  create(createCvHistoryDto: cvHistoryDto) {
    return 'This action adds a new cvHistory';
  }

  findAll() {
    return `This action returns all cvHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvHistory`;
  }

  update(id: number, updateCvHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} cvHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} cvHistory`;
  }
}
