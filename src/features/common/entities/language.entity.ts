import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { BaseModel } from '../../../core/base-model.entity';

@Entity('languages')
export class Language extends BaseModel {
  @Column({ length: 32, unique: true })
  title!: string;

  @Column({ length: 2, unique: true })
  code!: string;

  @OneToMany(() => Course, (course) => course.language)
  courses?: Relation<Course[]>;
}
