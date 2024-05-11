"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let SseService = class SseService {
    constructor() {
        this.cvSubject = new rxjs_1.Subject();
        this.clients = new Map();
    }
    addClient(user, client) {
        if (!this.clients.has(user)) {
            this.clients.set(user, []);
        }
        const userClients = this.clients.get(user);
        userClients.push(client);
        client.on('close', () => {
            this.removeClient(user, client);
        });
    }
    getCvObservable({ event: OPERATIONS, data: any }) {
        return this.cvSubject.asObservable();
    }
    removeClient(user, client) {
        const userClients = this.clients.get(user);
        if (userClients) {
            const index = userClients.indexOf(client);
            if (index !== -1) {
                userClients.splice(index, 1);
            }
            if (userClients.length === 0) {
                this.clients.delete(user);
            }
        }
    }
    sendEvent(user, data) {
        const userClients = this.clients.get(user);
        if (userClients) {
            userClients.forEach((client) => {
                client.write(`data: ${JSON.stringify(data)}\n\n`);
            });
        }
    }
    findAllAdminUsers() {
        const adminUsers = [];
        for (const [user, _] of this.clients) {
            if (user.role === 'admin') {
                adminUsers.push(user);
            }
        }
        return adminUsers;
    }
    sendToAdmins(data) {
        let admins = this.findAllAdminUsers();
        admins.forEach((admin) => {
            this.sendEvent(admin, data);
        });
    }
    sendToSpecificUser(userId, data) {
        let userConnections = this.findConnectionsByUserId(userId);
        if (userConnections.length > 0) {
            userConnections.forEach((userConn) => {
                this.sendEvent(userConn, data);
            });
        }
    }
    findConnectionsByUserId(userId) {
        const userConnections = [];
        for (const [user, _] of this.clients) {
            if (user.userId === userId) {
                userConnections.push(user);
            }
        }
        return userConnections;
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)()
], SseService);
//# sourceMappingURL=sseenv.service.js.map