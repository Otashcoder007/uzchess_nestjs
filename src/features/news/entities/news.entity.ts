import { BaseModel } from '../../../core/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity('news')
export class News extends BaseModel {
  @Column({ length: 256 })
  title!: string;

  @Column({ length: 128 })
  image!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'timestamp' })
  date!: Date;
}
