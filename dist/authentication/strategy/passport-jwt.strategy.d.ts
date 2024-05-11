import { Strategy } from 'passport-jwt';
import { PayloadInterface } from '../Interfaces/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validate(payload: PayloadInterface): Promise<UserEntity>;
}
export {};
