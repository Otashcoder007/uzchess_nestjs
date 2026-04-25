import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repositories/base-repository';
import { OtpCode } from '../entities/otp-code.entity';

@Injectable()
export class OtpCodeRepository extends BaseRepository<OtpCode> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(OtpCode)
    protected readonly repo: Repository<OtpCode>,
  ) {
    super();
  }
}
