"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
const skills_service_1 = require("../skills/skills.service");
const cvs_service_1 = require("../cvs/cvs.service");
async function seedData() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(users_service_1.UsersService);
    let user = userService.randomize();
    await userService.create(user);
    const skillService = app.get(skills_service_1.SkillsService);
    let skill = skillService.randomize();
    await skillService.create(skill);
    const cvService = app.get(cvs_service_1.CvsService);
    let cv = cvService.randomize();
    cv.user = user;
    await cvService.create(cv);
    await app.close();
}
seedData();
//# sourceMappingURL=seed-data.js.map