/// <reference types="multer" />
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Request } from "express";
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class CvsController {
    private readonly cvsService;
    constructor(cvsService: CvsService);
    random(): CreateCvDto;
    create(createCvDto: CreateCvDto): Promise<CreateCvDto & import("src/cvs/entities/cv.entity").CvEntity>;
    findAll(request: Request): Promise<import("src/cvs/entities/cv.entity").CvEntity[]>;
    find(age: number, chaine: string): Promise<import("src/cvs/entities/cv.entity").CvEntity[]>;
    findOne(id: string): Promise<import("src/cvs/entities/cv.entity").CvEntity>;
    update(id: string, updateCvDto: UpdateCvDto): Promise<import("src/cvs/entities/cv.entity").CvEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
export declare class CvsControllerV2 {
    private readonly cvsService;
    private eventEmitter;
    constructor(cvsService: CvsService, eventEmitter: EventEmitter2);
    random(): CreateCvDto;
    create(createCvDto: CreateCvDto, req: Request): Promise<CreateCvDto & import("src/cvs/entities/cv.entity").CvEntity>;
    findAll(pageNumber?: number, pageSize?: number): Promise<import("src/cvs/entities/cv.entity").CvEntity[]>;
    find(age: number, chaine: string): Promise<import("src/cvs/entities/cv.entity").CvEntity[]>;
    findOne(id: string): Promise<import("src/cvs/entities/cv.entity").CvEntity>;
    update(id: string, updateCvDto: UpdateCvDto, req: Request): Promise<void>;
    uploadFile(file: Express.Multer.File, id: string): void;
    remove(id: string, req: Request): Promise<import("typeorm").DeleteResult>;
    sse(user: any): Observable<void>;
}
