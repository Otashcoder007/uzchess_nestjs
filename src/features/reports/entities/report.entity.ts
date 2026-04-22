import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReportCategory } from './report-category.entity';
import { BaseModel } from '../../../core/base-model.entity';
import { User } from '../../authentication/entities/user.entity';
import { ReportType } from '../../../core/enums/report-type.enum';

@Entity('reports')
export class Report extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.reports)
  user?: Relation<User>;

  @Column()
  categoryId!: number;

  @ManyToOne(() => ReportCategory, (category) => category.reports, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category?: Relation<ReportCategory>;

  @Column({ type: 'enum', enum: ReportType })
  target!: ReportType;

  @Column()
  targetId!: number;

  @Column({ length: 256, nullable: true })
  description?: string;
}
