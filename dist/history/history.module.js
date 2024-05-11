"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const history_service_1 = require("./history.service");
const history_controller_1 = require("./history.controller");
const typeorm_1 = require("@nestjs/typeorm");
const history_entity_1 = require("./entities/history.entity");
const cv_listener_1 = require("../SseEv/cv.listener");
const sseenv_module_1 = require("../SseEv/sseenv.module");
let CvHistoryModule = class CvHistoryModule {
};
exports.CvHistoryModule = CvHistoryModule;
exports.CvHistoryModule = CvHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([history_entity_1.HistoryEntity]), sseenv_module_1.SseEnvModule],
        controllers: [history_controller_1.CvHistoryController],
        providers: [history_service_1.CvHistoryService, cv_listener_1.CvListener],
        exports: [cv_listener_1.CvListener],
    })
], CvHistoryModule);
//# sourceMappingURL=history.module.js.map