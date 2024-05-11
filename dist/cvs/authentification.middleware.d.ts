import { NestMiddleware } from "@nestjs/common";
export declare class AuthentificationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void): any;
}
