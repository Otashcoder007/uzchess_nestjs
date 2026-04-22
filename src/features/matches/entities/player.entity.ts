import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Country } from '../../common/entities/country.entity';
import { Match } from './match.entity';

@Entity('players')
export class Player extends BaseModel {
  @Column()
  countryId!: number;

  @ManyToOne(() => Country, (country) => country.players, {
    onDelete: 'RESTRICT',
  })
  country?: Relation<Country>;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 128, nullable: true })
  image?: string;

  @Column({ nullable: true })
  classic?: number;

  @Column({ nullable: true })
  rapid?: number;

  @Column({ nullable: true })
  blitz?: number;

  @OneToMany(() => Match, (match) => match.firstPlayer)
  matchesAsFirst?: Relation<Match[]>;

  @OneToMany(() => Match, (match) => match.secondPlayer)
  matchesAsSecond?: Relation<Match[]>;
}
