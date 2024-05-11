import { CreateCvDto } from './dto/create-cv.dto';
import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { CvEntity } from "./entities/cv.entity";
import { UserEntity } from "../users/entities/user.entity";
import { SseService } from 'src/SseEv/sseenv.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class CvsService {
    private cvRepository;
    private userRepository;
    private readonly sseService;
    private eventEmitter;
    constructor(cvRepository: Repository<CvEntity>, userRepository: Repository<UserEntity>, sseService: SseService, eventEmitter: EventEmitter2);
    randomize(): CreateCvDto;
    create(createCvDto: CreateCvDto): Promise<CreateCvDto & CvEntity>;
    createV2(createCvDto: CreateCvDto, userId: string): Promise<CvEntity>;
    createSse(createCvDto: CreateCvDto, userId: string): Promise<CreateCvDto & CvEntity>;
    findAll(pageNumber?: number, pageSize?: number): Promise<CvEntity[]>;
    findOne(id: string): Promise<CvEntity>;
    find(age: number, chaine?: string): Promise<CvEntity[]>;
    update(id: string, updateCvDto: DeepPartial<CvEntity>): Promise<CvEntity>;
    updateV2(id: string, updateCvDto: DeepPartial<CvEntity>, userId: string): Promise<CvEntity>;
    updateSse(id: string, updateCvDto: DeepPartial<CvEntity>, userId: string): Promise<void>;
    remove(id: string): Promise<DeleteResult>;
    removeV2(id: string, userId: string): Promise<DeleteResult>;
    removeSse(id: string, userId: string): Promise<DeleteResult>;
}
