import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { CvEntity } from 'src/cvs/entities/cv.entity';
  import { UserEntity } from 'src/users/entities/user.entity';
import { OPERATIONS } from 'src/SseEv/cv.events';

@Entity()
export class HistoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    action: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, { eager: true })
    user: UserEntity;

    @ManyToOne(() => CvEntity, { eager: true })
    cv: CvEntity;
}