import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../../common/entities/author.entity';
import { Language } from '../../common/entities/language.entity';
import { Difficulty } from '../../common/entities/difficulty.entity';
import { BookCategory } from './book-category.entity';
import { BookReview } from './book-review.entity';
import { BookLike } from './book-like.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column()
  authorId!: number;

  @ManyToOne(() => Author, (author) => author.courses, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'authorId' })
  author?: Relation<Author>;

  @Column()
  categoryId!: number;

  @ManyToOne(() => BookCategory, (bookCategory) => bookCategory.books, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Relation<BookCategory>;

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

  @Column({ length: 128, nullable: true })
  image?: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  newPrice?: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating?: number;

  @Column({ default: 0 })
  reviewsCount!: number;

  @Column()
  pages!: number;

  @Column({ type: 'date' })
  pubDate!: Date;

  @OneToMany(() => BookReview, (review) => review.book)
  reviews?: Relation<BookReview[]>;

  @OneToMany(() => BookLike, (like) => like.book)
  likes?: Relation<BookLike[]>;
}
