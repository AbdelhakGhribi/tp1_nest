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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryEntity = void 0;
const typeorm_1 = require("typeorm");
const cv_entity_1 = require("../../cvs/entities/cv.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let HistoryEntity = class HistoryEntity {
};
exports.HistoryEntity = HistoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], HistoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistoryEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistoryEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistoryEntity.prototype, "cvId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HistoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { eager: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], HistoryEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cv_entity_1.CvEntity, { eager: true }),
    __metadata("design:type", cv_entity_1.CvEntity)
], HistoryEntity.prototype, "cv", void 0);
exports.HistoryEntity = HistoryEntity = __decorate([
    (0, typeorm_1.Entity)()
], HistoryEntity);
//# sourceMappingURL=history.entity.js.map