import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../authentication/entities/user.entity';
import { News } from './news.entity';

@Entity('newsViews')
export class NewsView extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: Relation<User>;

  @Column()
  newsId!: number;

  @ManyToOne(() => News, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsId' })
  news?: Relation<News>;

  @CreateDateColumn()
  firstDate!: Date;

  @Column({ type: 'timestamp' })
  lastDate!: Date;

  @Column({ default: 1 })
  count!: number;
}
