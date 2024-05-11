import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthenticationService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
