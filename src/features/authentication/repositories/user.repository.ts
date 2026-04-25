import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseRepository } from '../../../core/repositories/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(User)
    protected readonly repo: Repository<User>,
  ) {
    super();
  }
}
