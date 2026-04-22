import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Player } from './player.entity';
import { MatchType } from '../../../core/enums/match-type.enum';
import { WinnerType } from '../../../core/enums/winner-type.enum';

@Entity('matches')
export class Match extends BaseModel {
  @Column()
  firstPlayerId!: number;

  @ManyToOne(() => Player, (player) => player.matchesAsFirst, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'firstPlayerId' })
  firstPlayer?: Relation<Player>;

  @Column()
  firstPlayerResult!: number;

  @Column()
  secondPlayerId!: number;

  @ManyToOne(() => Player, (player) => player.matchesAsSecond, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'secondPlayerId' })
  secondPlayer?: Relation<Player>;

  @Column()
  secondPlayerResult!: number;

  @Column({ type: 'enum', enum: MatchType })
  type!: MatchType;

  @Column()
  moves!: number;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'enum', enum: WinnerType })
  winner!: WinnerType;
}
