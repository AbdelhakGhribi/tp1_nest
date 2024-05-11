import { HistoryEntity } from 'src/history/entities/history.entity';
import { Repository } from 'typeorm';
export declare class CvListener {
    private readonly historyRepository;
    constructor(historyRepository: Repository<HistoryEntity>);
    handleCreation(payload: any): Promise<{
        action: string;
        user: any;
        cv: any;
    } & HistoryEntity>;
    handleUpdate(payload: any): Promise<{
        action: string;
        user: any;
        cv: any;
    } & HistoryEntity>;
    handleDelete(payload: any): Promise<{
        action: string;
        user: any;
        cv: any;
    } & HistoryEntity>;
    handleHistory(action: string, payload: any): Promise<{
        action: string;
        user: any;
        cv: any;
    } & HistoryEntity>;
}
