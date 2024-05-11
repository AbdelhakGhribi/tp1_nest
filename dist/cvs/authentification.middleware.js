"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationMiddleware = void 0;
const common_1 = require("@nestjs/common");
class AuthentificationMiddleware {
    use(req, res, next) {
        let header = req.headers;
        if (header.hasOwnProperty("auth-user")) {
            let jwt = require('jsonwebtoken');
            let token = header['auth-user'];
            let decoded = jwt.decode(token);
            if (decoded !== null) {
                let userID = decoded['sub'];
                req.userInfo = {
                    "user-id": userID
                };
            }
            else {
                throw new common_1.UnauthorizedException("Vous n'êtes pas autorisé à accéder à cette ressource");
            }
        }
        else {
            throw new common_1.UnauthorizedException("Vous n'êtes pas autorisé à accéder à cette ressource");
        }
        next();
    }
}
exports.AuthentificationMiddleware = AuthentificationMiddleware;
//# sourceMappingURL=authentification.middleware.js.map