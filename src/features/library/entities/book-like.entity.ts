import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { User } from '../../authentication/entities/user.entity';
import { Book } from './book.entity';

@Entity('bookLikes')
export class BookLike extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.bookLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: Relation<User>;

  @Column()
  bookId!: number;

  @ManyToOne(() => Book, (book) => book.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book?: Relation<Book>;
}
