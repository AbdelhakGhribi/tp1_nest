"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cv_entity_1 = require("./entities/cv.entity");
const falso_1 = require("@ngneat/falso");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const user_entity_1 = require("../users/entities/user.entity");
const sseenv_service_1 = require("../SseEv/sseenv.service");
const cv_events_1 = require("../SseEv/cv.events");
const event_emitter_1 = require("@nestjs/event-emitter");
let CvsService = class CvsService {
    constructor(cvRepository, userRepository, sseService, eventEmitter) {
        this.cvRepository = cvRepository;
        this.userRepository = userRepository;
        this.sseService = sseService;
        this.eventEmitter = eventEmitter;
    }
    randomize() {
        const cv = {
            id: (0, falso_1.randUuid)(),
            name: (0, falso_1.randLastName)(),
            firstName: (0, falso_1.randFirstName)(),
            age: Math.floor(Math.random() * 100 + 1),
            cin: (0, random_string_generator_util_1.randomStringGenerator)(),
            job: (0, falso_1.randJobTitle)(),
            path: (0, falso_1.randDirectoryPath)(),
        };
        return cv;
    }
    async create(createCvDto) {
        return await this.cvRepository.save(createCvDto);
    }
    async createV2(createCvDto, userId) {
        let user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        let cv = new cv_entity_1.CvEntity();
        cv = { ...createCvDto, user: user };
        return await this.cvRepository.save(cv);
    }
    async createSse(createCvDto, userId) {
        const createdCv = await this.cvRepository.save(createCvDto);
        if (createdCv) {
            this.eventEmitter.emit(cv_events_1.OPERATIONS.CV_ADD, {
                userId: userId,
                cv: createdCv
            });
        }
        return createdCv;
    }
    async findAll(pageNumber = 1, pageSize = 3) {
        const cvs = await this.cvRepository.find({
            relations: ['user', 'skills'],
            skip: (pageSize - 1) * pageNumber,
            take: pageSize
        });
        return cvs;
    }
    async findOne(id) {
        return await this.cvRepository.findOneBy({
            id: id,
        });
    }
    async find(age, chaine) {
        return this.cvRepository
            .createQueryBuilder('cv')
            .where('cv.age= :age', { age: age })
            .orWhere('cv.name LIKE :chaine', { chaine: `%${chaine}%` })
            .orWhere('cv.firstname LIKE :chaine', { chaine: `%${chaine}%` })
            .orWhere('cv.job LIKE :chaine', { chaine: `%${chaine}%` })
            .getMany();
    }
    async update(id, updateCvDto) {
        const cv = await this.cvRepository.preload({
            id: id,
            ...updateCvDto
        });
        if (!cv) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        return await this.cvRepository.save(cv);
    }
    async updateV2(id, updateCvDto, userId) {
        const cv = await this.cvRepository.findOne({
            where: { id: id },
            relations: ['user']
        });
        if (!cv) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        let user = await this.userRepository.findOneBy({ id: userId });
        if (!user || !cv.user || cv.user.id != user.id) {
            throw new common_1.UnauthorizedException();
        }
        const cvFinal = {
            id: id,
            ...updateCvDto
        };
        return this.cvRepository.save(cvFinal);
    }
    async updateSse(id, updateCvDto, userId) {
        const cv = await this.cvRepository.findOne({
            where: { id: id },
            relations: ['user']
        });
        if (!cv) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        let user = await this.userRepository.findOneBy({ id: userId });
        if (!user || !cv.user || cv.user.id != user.id) {
            throw new common_1.UnauthorizedException();
        }
        const updatedCv = {
            id: id,
            ...updateCvDto
        };
        if (updatedCv) {
            this.eventEmitter.emit(cv_events_1.OPERATIONS.CV_UPDATE, {
                userId: userId,
                cv: updatedCv
            });
        }
    }
    async remove(id) {
        const result = await this.cvRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        else {
            return result;
        }
    }
    async removeV2(id, userId) {
        const cv = await this.cvRepository.findOne({
            where: { id: id },
            relations: ['user']
        });
        if (!cv) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        let user = await this.userRepository.findOneBy({ id: userId });
        console.log(cv);
        if (!user || !cv.user || cv.user.id != user.id) {
            throw new common_1.UnauthorizedException();
        }
        const result = await this.cvRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        else {
            return result;
        }
    }
    async removeSse(id, userId) {
        const cv = await this.cvRepository.findOne({
            where: { id: id },
            relations: ['user']
        });
        if (!cv) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
        }
        let user = await this.userRepository.findOneBy({ id: userId });
        if (!user || !cv.user || cv.user.id != user.id) {
            throw new common_1.UnauthorizedException();
        }
        const result = await this.cvRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException(`cv d'id ${id} n'existe pas dans la base`);
            this.eventEmitter.emit(cv_events_1.OPERATIONS.CV_DELETE, {
                userId: userId,
                cv: cv
            });
        }
        return result;
    }
};
exports.CvsService = CvsService;
exports.CvsService = CvsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cv_entity_1.CvEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        sseenv_service_1.SseService,
        event_emitter_1.EventEmitter2])
], CvsService);
//# sourceMappingURL=cvs.service.js.map