import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { Course } from './course.entity';

@Entity('courseReviews')
export class CourseReview extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.courseReviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: Relation<User>;

  @Column()
  courseId!: number;

  @ManyToOne(() => Course, (course) => course.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course?: Relation<Course>;

  @Column()
  rating!: number;

  @Column({ length: 512, nullable: true })
  comment?: string;
}
