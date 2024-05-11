import { CvEntity } from 'src/cvs/entities/cv.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class HistoryEntity {
    id: string;
    action: string;
    createdAt: Date;
    user: UserEntity;
    cv: CvEntity;
}
