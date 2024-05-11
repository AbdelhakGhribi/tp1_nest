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
exports.CvsControllerV2 = exports.CvsController = void 0;
const common_1 = require("@nestjs/common");
const cvs_service_1 = require("./cvs.service");
const create_cv_dto_1 = require("./dto/create-cv.dto");
const update_cv_dto_1 = require("./dto/update-cv.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../authentication/Guards/jwt-auth.guard");
const roles_decorator_1 = require("../authentication/decorators/roles.decorator");
const role_auth_guard_1 = require("../authentication/Guards/role-auth.guard");
const rxjs_1 = require("rxjs");
const cv_events_1 = require("../SseEv/cv.events");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_decorator_1 = require("../decorators/user.decorator");
let CvsController = class CvsController {
    constructor(cvsService) {
        this.cvsService = cvsService;
    }
    random() {
        return this.cvsService.randomize();
    }
    create(createCvDto) {
        return this.cvsService.create(createCvDto);
    }
    findAll(request) {
        console.log(request.user);
        return this.cvsService.findAll();
    }
    find(age, chaine) {
        return this.cvsService.find(age, chaine);
    }
    findOne(id) {
        return this.cvsService.findOne(id);
    }
    update(id, updateCvDto) {
        return this.cvsService.update(id, updateCvDto);
    }
    remove(id) {
        return this.cvsService.remove(id);
    }
};
exports.CvsController = CvsController;
__decorate([
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "random", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cv_dto_1.CreateCvDto]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(role_auth_guard_1.RolesAuthGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/find/:age/:chaine?'),
    __param(0, (0, common_1.Param)('age')),
    __param(1, (0, common_1.Param)('chaine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "find", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cv_dto_1.UpdateCvDto]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CvsController.prototype, "remove", null);
exports.CvsController = CvsController = __decorate([
    (0, common_1.Controller)({
        path: 'cvs', version: '1',
    }),
    __metadata("design:paramtypes", [cvs_service_1.CvsService])
], CvsController);
let CvsControllerV2 = class CvsControllerV2 {
    constructor(cvsService, eventEmitter) {
        this.cvsService = cvsService;
        this.eventEmitter = eventEmitter;
    }
    random() {
        return this.cvsService.randomize();
    }
    create(createCvDto, req) {
        let userId = req['userInfo']['user-id'];
        return this.cvsService.createSse(createCvDto, userId);
    }
    findAll(pageNumber = 1, pageSize = 10) {
        return this.cvsService.findAll(pageNumber, pageSize);
    }
    find(age, chaine) {
        return this.cvsService.find(age, chaine);
    }
    findOne(id) {
        return this.cvsService.findOne(id);
    }
    update(id, updateCvDto, req) {
        let userId = req['userInfo']['user-id'];
        return this.cvsService.updateSse(id, updateCvDto, userId);
    }
    uploadFile(file, id) {
        console.log(file);
    }
    remove(id, req) {
        let userId = req['userInfo']['user-id'];
        return this.cvsService.removeSse(id, userId);
    }
    sse(user) {
        return (0, rxjs_1.fromEvent)(this.eventEmitter, cv_events_1.OPERATIONS.CV_ADD).pipe((0, rxjs_1.map)((payload) => {
            payload.userId = user;
            if (user.id === payload.cv.userId || user.role === 'admin') {
                return new MessageEvent(cv_events_1.OPERATIONS.CV_ADD, { data: payload });
            }
            else {
                return new MessageEvent('default', { data: null });
            }
        }));
    }
};
exports.CvsControllerV2 = CvsControllerV2;
__decorate([
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "random", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cv_dto_1.CreateCvDto, Object]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pageNumber', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/find/:age/:chaine?'),
    __param(0, (0, common_1.Param)('age')),
    __param(1, (0, common_1.Param)('chaine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cv_dto_1.UpdateCvDto, Object]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "update", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        dest: 'uploads/',
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 1000000 }), new common_1.FileTypeValidator({ fileType: /.jpeg|jpg|png$/ })],
    }))),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CvsControllerV2.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Sse)('sse/testcvs'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CvsControllerV2.prototype, "sse", null);
exports.CvsControllerV2 = CvsControllerV2 = __decorate([
    (0, common_1.Controller)({
        path: 'cvs', version: '2',
    }),
    __metadata("design:paramtypes", [cvs_service_1.CvsService, event_emitter_1.EventEmitter2])
], CvsControllerV2);
//# sourceMappingURL=cvs.controller.js.map