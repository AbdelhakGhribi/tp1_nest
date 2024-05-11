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
exports.CvEntity = void 0;
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("../../skills/entities/skill.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let CvEntity = class CvEntity {
};
exports.CvEntity = CvEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CvEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CvEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CvEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CvEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CvEntity.prototype, "cin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CvEntity.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CvEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => skill_entity_1.SkillEntity, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], CvEntity.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.cvs, { cascade: true, lazy: false }),
    __metadata("design:type", user_entity_1.UserEntity)
], CvEntity.prototype, "user", void 0);
exports.CvEntity = CvEntity = __decorate([
    (0, typeorm_1.Entity)()
], CvEntity);
//# sourceMappingURL=cv.entity.js.map