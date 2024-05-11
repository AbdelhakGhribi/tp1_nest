import { SseService } from './sseenv.service';
import { HistoryEntity } from 'src/history/entities/history.entity';
import { Repository } from 'typeorm';
export declare class CvListener {
    private readonly sseService;
    private readonly historyRepository;
    constructor(sseService: SseService, historyRepository: Repository<HistoryEntity>);
    handleCreation(payload: any): Promise<{
        action: string;
        userId: any;
        cvId: any;
    } & HistoryEntity>;
    handleUpdate(payload: any): Promise<{
        action: string;
        userId: any;
        cvId: any;
    } & HistoryEntity>;
    handleDelete(payload: any): Promise<{
        action: string;
        userId: any;
        cvId: any;
    } & HistoryEntity>;
    handleHistory(action: string, payload: any): Promise<{
        action: string;
        userId: any;
        cvId: any;
    } & HistoryEntity>;
}
