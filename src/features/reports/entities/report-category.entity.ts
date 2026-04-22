import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { Report } from './report.entity';
import { BaseModel } from '../../../core/base-model.entity';

@Entity('reportCategories')
export class ReportCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ nullable: true })
  order?: number;

  @OneToMany(() => Report, (report) => report.category)
  reports?: Relation<Report[]>;
}
