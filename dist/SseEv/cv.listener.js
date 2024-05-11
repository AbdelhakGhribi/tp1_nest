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
exports.CvListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const cv_events_1 = require("./cv.events");
const typeorm_1 = require("typeorm");
let CvListener = class CvListener {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async handleCreation(payload) {
        console.log("kotkot");
        return await this.handleHistory('CV_ADD', payload);
    }
    async handleUpdate(payload) {
        return await this.handleHistory('CV_UPDATE', payload);
    }
    async handleDelete(payload) {
        return await this.handleHistory('CV_DELETE', payload);
    }
    async handleHistory(action, payload) {
        console.log('kotkot');
        let result = await this.historyRepository.save({
            action: action, user: payload.user, cv: payload.cv,
        });
        return result;
    }
};
exports.CvListener = CvListener;
__decorate([
    (0, event_emitter_1.OnEvent)(cv_events_1.OPERATIONS.CV_ADD),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CvListener.prototype, "handleCreation", null);
__decorate([
    (0, event_emitter_1.OnEvent)(cv_events_1.OPERATIONS.CV_UPDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CvListener.prototype, "handleUpdate", null);
__decorate([
    (0, event_emitter_1.OnEvent)(cv_events_1.OPERATIONS.CV_DELETE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CvListener.prototype, "handleDelete", null);
exports.CvListener = CvListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CvListener);
//# sourceMappingURL=cv.listener.js.map