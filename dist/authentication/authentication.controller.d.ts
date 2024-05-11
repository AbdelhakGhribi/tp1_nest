import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(createUserDto: CreateUserDto): Promise<import("src/users/entities/user.entity").UserEntity>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
