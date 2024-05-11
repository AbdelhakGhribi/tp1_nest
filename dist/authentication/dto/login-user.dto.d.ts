import { CreateUserDto } from '../../users/dto/create-user.dto';
declare const LoginUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class LoginUserDto extends LoginUserDto_base {
    email: string;
    password: string;
}
export {};
