import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { OtpCode } from './otp-code.entity';
import { BookReview } from '../../library/entities/book-review.entity';
import { CourseReview } from '../../courses/entities/course-review.entity';
import { CourseLike } from '../../courses/entities/course-like.entity';
import { BookLike } from '../../library/entities/book-like.entity';
import { UsersLessons } from '../../courses/entities/users-lessons.entity';
import { BaseModel } from '../../../core/base-model.entity';
import { Role } from '../../../core/enums/role.enum';
import { LoginType } from '../../../core/enums/login-type.enum';
import { Report } from '../../reports/entities/report.entity';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role!: Role;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 128, nullable: true })
  profileImage?: string;

  @Column({ length: 64, unique: true })
  login!: string;

  @Column({ type: 'enum', enum: LoginType })
  loginType!: LoginType;

  @Column({ length: 128, nullable: true })
  password?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;

  @OneToMany(() => OtpCode, (otpCode) => otpCode.user)
  otpCodes?: Relation<OtpCode[]>;

  @OneToMany(() => BookReview, (bookReview) => bookReview.user)
  bookReviews?: Relation<BookReview[]>;

  @OneToMany(() => BookLike, (bookLike) => bookLike.user)
  bookLikes?: Relation<BookLike[]>;

  @OneToMany(() => CourseReview, (courseReview) => courseReview.user)
  courseReviews?: Relation<CourseReview[]>;

  @OneToMany(() => CourseLike, (courseLike) => courseLike.user)
  courseLikes?: Relation<CourseLike[]>;

  @OneToMany(() => UsersLessons, (lesson) => lesson.user)
  lessons?: Relation<UsersLessons[]>;

  @OneToMany(() => Report, (r) => r.user)
  reports?: Relation<Report[]>;
}
