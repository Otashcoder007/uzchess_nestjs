import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from '../entities/difficulty.entity';

export class DifficultyRepository extends BaseRepository<Difficulty> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Difficulty)
    protected readonly repo: Repository<Difficulty>,
  ) {
    super();
  }
}
