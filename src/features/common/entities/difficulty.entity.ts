import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { BaseModel } from '../../../core/base-model.entity';
import { Book } from '../../library/entities/book.entity';

@Entity('difficulties')
export class Difficulty extends BaseModel {
  @Column({ length: 32, unique: true })
  title!: string;

  @Column({ length: 128 })
  icon!: string;

  @OneToMany(() => Course, (course) => course.difficulty)
  courses?: Relation<Course[]>;

  @OneToMany(() => Book, (b) => b.difficulty)
  books?: Relation<Book[]>;
}
