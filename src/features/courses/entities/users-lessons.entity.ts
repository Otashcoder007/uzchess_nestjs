import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { CourseLesson } from './course-lesson.entity';

@Entity('usersLessons')
export class UsersLessons extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: Relation<User>;

  @Column()
  courseLessonId!: number;

  @ManyToOne(() => CourseLesson, (lesson) => lesson.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseLessonId' })
  courseLesson?: Relation<CourseLesson>;

  @Column({ nullable: true })
  stoppedAt?: number;

  @Column({ type: 'boolean', default: false })
  isCompleted!: boolean;
}
