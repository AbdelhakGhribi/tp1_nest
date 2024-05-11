import { HistoryEntity } from 'src/history/entities/history.entity';
import { Repository } from 'typeorm';
export declare class CvListener {
    private readonly historyRepository;
    constructor(historyRepository: Repository<HistoryEntity>);
    handleCreation(payload: any): Promise<void>;
    handleUpdate(payload: any): Promise<void>;
    handleDelete(payload: any): Promise<void>;
    handleHistory(action: string, payload: any): Promise<void>;
}
