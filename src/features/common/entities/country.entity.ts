import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../../core/base-model.entity';
import { Player } from '../../matches/entities/player.entity';

@Entity('countries')
export class Country extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @Column({ length: 128 })
  flag!: string;

  @OneToMany(() => Player, (player) => player.country)
  players?: Relation<Player[]>;
}
