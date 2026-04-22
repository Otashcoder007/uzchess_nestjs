import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';

@Entity('terms')
export class Terms extends BaseModel {
  @Column({ type: 'text' })
  content!: string;
}
