"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvsModule = void 0;
const common_1 = require("@nestjs/common");
const cvs_service_1 = require("./cvs.service");
const cvs_controller_1 = require("./cvs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cv_entity_1 = require("./entities/cv.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CvsModule = class CvsModule {
};
exports.CvsModule = CvsModule;
exports.CvsModule = CvsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cvs_controller_1.CvsController, cvs_controller_1.CvsControllerV2],
        providers: [cvs_service_1.CvsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([cv_entity_1.CvEntity, user_entity_1.UserEntity])]
    })
], CvsModule);
//# sourceMappingURL=cvs.module.js.map