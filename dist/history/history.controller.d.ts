import { CvHistoryService } from './history.service';
import { cvHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
export declare class CvHistoryController {
    private readonly cvHistoryService;
    constructor(cvHistoryService: CvHistoryService);
    create(createCvHistoryDto: cvHistoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCvHistoryDto: UpdateHistoryDto): string;
    remove(id: string): string;
}
