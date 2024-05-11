import { PartialType } from '@nestjs/mapped-types';
import { cvHistoryDto } from './create-history.dto';

export class UpdateHistoryDto extends PartialType(cvHistoryDto) {}
