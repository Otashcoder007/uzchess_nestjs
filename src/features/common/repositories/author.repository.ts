import { BaseRepository } from '../../../core/repositories/base-repository';
import { Author } from '../entities/author.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class AuthorRepository extends BaseRepository<Author> {
  constructor(
    protected readonly config: ConfigService,
    @InjectRepository(Author)
    protected readonly repo: Repository<Author>,
  ) {
    super();
  }
}
