import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { User } from '../../authentication/entities/user.entity';
import { Course } from './course.entity';

@Entity('courseLikes')
export class CourseLike extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.courseLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: Relation<User>;

  @Column()
  courseId!: number;

  @ManyToOne(() => Course, (course) => course.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course?: Relation<Course>;
}
