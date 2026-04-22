import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { Course } from './course.entity';
import { CourseSection } from './course-section.entity';
import { UsersLessons } from './users-lessons.entity';

@Entity('courseLessons')
export class CourseLesson extends BaseModel {
  @Column()
  courseId!: number;

  @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course?: Relation<Course>;

  @Column()
  courseSectionId!: number;

  @ManyToOne(() => CourseSection, (section) => section.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseSectionId' })
  courseSection?: Relation<CourseSection>;

  @Column({ length: 128 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ length: 128, nullable: true })
  thumbnail?: string;

  @Column({ length: 256 })
  video!: string;

  @Column({ nullable: true })
  order?: number;

  @Column({ type: 'boolean', default: false })
  isFree!: boolean;

  @OneToMany(() => UsersLessons, (user) => user.courseLesson)
  users?: Relation<UsersLessons[]>;
}
