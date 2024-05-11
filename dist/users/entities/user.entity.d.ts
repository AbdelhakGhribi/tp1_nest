import { CvEntity } from "../../cvs/entities/cv.entity";
export declare class UserEntity {
    id?: string;
    username: string;
    email: string;
    password: string;
    cvs?: CvEntity;
    salt?: string;
    role?: string;
}
