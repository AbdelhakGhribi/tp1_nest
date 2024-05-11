import { UserEntity } from "../../users/entities/user.entity";
export declare class CreateCvDto {
    id: string;
    name: string;
    firstName: string;
    age: number;
    cin: string;
    job: string;
    path: string;
    user?: UserEntity;
}
