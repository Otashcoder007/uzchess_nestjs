import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('bookCategories')
export class BookCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => Book, (book) => book.category)
  books?: Relation<Book[]>;
}
