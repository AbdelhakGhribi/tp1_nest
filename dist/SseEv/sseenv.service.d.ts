import { Response } from 'express';
interface UserToSaveSse {
    userId: number;
    role: string;
}
export declare class SseService {
    private readonly cvSubject;
    private clients;
    addClient(user: UserToSaveSse, client: Response): void;
    getCvObservable({ event: OPERATIONS, data: any }: {
        event: any;
        data: any;
    }): import("rxjs").Observable<unknown>;
    removeClient(user: UserToSaveSse, client: Response): void;
    sendEvent(user: UserToSaveSse, data: any): void;
    findAllAdminUsers(): UserToSaveSse[];
    sendToAdmins(data: any): void;
    sendToSpecificUser(userId: number, data: any): void;
    findConnectionsByUserId(userId: number): UserToSaveSse[];
}
export {};
