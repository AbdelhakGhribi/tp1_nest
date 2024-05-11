import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UsersService {
    private UserRepository;
    constructor(UserRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & UserEntity>;
    randomize(): CreateUserDto;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
