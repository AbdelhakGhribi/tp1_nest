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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const js_sha256_1 = require("js-sha256");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../users/entities/user.entity");
let AuthenticationService = class AuthenticationService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        let username = createUserDto.username;
        let email = createUserDto.email;
        let existUsername = await this.userRepository.findOneBy({ username: username });
        if (existUsername) {
            throw new common_1.BadRequestException(`username ${username} already used`);
        }
        let existEmail = await this.userRepository.findOneBy({ email: email });
        if (existEmail) {
            throw new common_1.BadRequestException(`email ${email} already used`);
        }
        const salt = (0, random_string_generator_util_1.randomStringGenerator)();
        let hashedPassword = (0, js_sha256_1.sha256)(createUserDto.password) + salt;
        let user = {
            username: username,
            email: email,
            role: "member",
            password: hashedPassword,
            salt: salt,
        };
        console.log(user);
        return await this.userRepository.save(user);
    }
    async login(loginUserDto) {
        let user = await this.userRepository.findOneBy({ email: loginUserDto.email });
        if (!user) {
            throw new common_1.BadRequestException("aucun compte ne correspond à cet email");
        }
        let salt = user.salt;
        let hashedPassword = (0, js_sha256_1.sha256)(loginUserDto.password) + salt;
        if (hashedPassword !== user.password) {
            throw new common_1.BadRequestException("mot de passe incorrect");
        }
        let payload = {
            email: user.email,
            username: user.username,
            role: user.role
        };
        const jwt = this.jwtService.sign(payload, { secret: " " });
        return {
            access_token: jwt
        };
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map