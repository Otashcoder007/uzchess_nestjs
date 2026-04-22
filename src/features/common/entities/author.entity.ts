import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('author')
export class Author extends BaseModel {
  @Column({ length: 64 })
  fullName!: string;

  @OneToMany(() => Course, (course) => course.author)
  courses?: Relation<Course[]>;
}
