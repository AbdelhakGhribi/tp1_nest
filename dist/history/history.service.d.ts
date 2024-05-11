import { cvHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
export declare class CvHistoryService {
    create(createCvHistoryDto: cvHistoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCvHistoryDto: UpdateHistoryDto): string;
    remove(id: number): string;
}
