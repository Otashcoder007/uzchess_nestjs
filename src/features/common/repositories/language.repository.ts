import { BaseRepository } from '../../../core/repositories/base-repository';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';

export class LanguageRepository extends BaseRepository<Language> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Language)
    protected readonly repo: Repository<Language>,
  ) {
    super();
  }
}
