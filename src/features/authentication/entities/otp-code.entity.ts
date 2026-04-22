import { BaseModel } from '../../../core/base-model.entity';
import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OtpType } from '../../../core/enums/otp-type.enum';
import { User } from './user.entity';

@Entity('otpCodes')
export class OtpCode extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.otpCodes, { onDelete: 'CASCADE' })
  user?: Relation<User>;

  @Column({ length: 6 })
  code!: string;

  @Column({ type: 'enum', enum: OtpType })
  type!: OtpType;
}
