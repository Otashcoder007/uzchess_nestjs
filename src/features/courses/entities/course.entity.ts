import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { Author } from '../../common/entities/author.entity';
import { Language } from '../../common/entities/language.entity';
import { Difficulty } from '../../common/entities/difficulty.entity';
import { CourseSection } from './course-section.entity';
import { CourseReview } from './course-review.entity';
import { CourseLike } from './course-like.entity';
import { CourseCategory } from './course-category.entity';
import { CourseLesson } from './course-lesson.entity';
import { CoursePurchase } from './course-purchase.entity';

@Entity('courses')
export class Course extends BaseModel {
  @Column()
  authorId!: number;

  @ManyToOne(() => Author, (author) => author.courses, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'authorId' })
  author?: Relation<Author>;

  @Column()
  categoryId!: number;

  @ManyToOne(() => CourseCategory, (category) => category.courses, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Relation<CourseCategory>;

  @Column()
  languageId!: number;

  @ManyToOne(() => Language, (language) => language.courses, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'languageId' })
  language?: Relation<Language>;

  @Column()
  difficultyId!: number;

  @ManyToOne(() => Difficulty, (difficulty) => difficulty.courses, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'difficultyId' })
  difficulty?: Relation<Difficulty>;

  @Column({ length: 128 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  newPrice?: number;

  @Column({ default: 0 })
  reviewsCount!: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating?: number;

  @Column({ default: 0 })
  sectionsCount!: number;

  @Column({ default: 0 })
  lessonsCount!: number;

  @OneToMany(() => CourseSection, (courseSection) => courseSection.course)
  sections?: Relation<CourseSection[]>;

  @OneToMany(() => CourseLesson, (lesson) => lesson.course)
  lessons?: Relation<CourseLesson[]>;

  @OneToMany(() => CourseReview, (review) => review.course)
  reviews?: Relation<CourseReview[]>;

  @OneToMany(() => CourseLike, (like) => like.course)
  likes?: Relation<CourseLike[]>;

  @OneToMany(() => CoursePurchase, (purchase) => purchase.course)
  purchases?: Relation<CoursePurchase[]>;
}
