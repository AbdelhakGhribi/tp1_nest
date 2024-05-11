import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from "./entities/skill.entity";
import { Repository } from "typeorm";
export declare class SkillsService {
    private skillRepository;
    constructor(skillRepository: Repository<SkillEntity>);
    randomize(): CreateSkillDto;
    create(createSkillDto: CreateSkillDto): Promise<CreateSkillDto & SkillEntity>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSkillDto: UpdateSkillDto): string;
    remove(id: number): string;
}
