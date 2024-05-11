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
exports.SseController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const event_emitter_1 = require("@nestjs/event-emitter");
const jwt_auth_guard_1 = require("../authentication/Guards/jwt-auth.guard");
const user_entity_1 = require("../users/entities/user.entity");
const cv_entity_1 = require("../cvs/entities/cv.entity");
const user_decorator_1 = require("../decorators/user.decorator");
let SseController = class SseController {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    sse(SubscribedUser) {
        return (0, rxjs_1.fromEvent)(this.eventEmitter, `${cv_entity_1.CvEntity}.*`).pipe((0, rxjs_1.filter)((event) => {
            return (SubscribedUser.role === "admin" ||
                SubscribedUser.id === event.cv.user.id);
        }), (0, rxjs_1.map)((event) => {
            return new MessageEvent(`${cv_entity_1.CvEntity}.notification`, {
                data: event,
            });
        }));
    }
};
exports.SseController = SseController;
__decorate([
    (0, common_1.Sse)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", rxjs_1.Observable)
], SseController.prototype, "sse", null);
exports.SseController = SseController = __decorate([
    (0, common_1.Controller)('sse'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], SseController);
//# sourceMappingURL=sseenv.controller.js.map