import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(user: UserEntity): string;
}
