"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const falso_1 = require("@ngneat/falso");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const user = {
    email: (0, falso_1.randEmail)(),
    name: (0, falso_1.randFullName)(),
    password: (0, falso_1.randPassword)()
};
const cv = {
    name: (0, falso_1.randLastName)(),
    firstName: (0, falso_1.randFirstName)(),
    cin: (0, random_string_generator_util_1.randomStringGenerator)(),
    job: (0, falso_1.randJobTitle)(),
    path: (0, falso_1.randDirectoryPath)()
};
const skill = {
    designation: (0, falso_1.randSkill)()
};
console.log(cv);
//# sourceMappingURL=random-utils.js.map