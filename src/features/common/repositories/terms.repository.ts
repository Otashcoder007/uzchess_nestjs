import { BaseRepository } from '../../../core/repositories/base-repository';
import { Author } from '../entities/author.entity';

export abstract class TermsRepository extends BaseRepository<Author> {
  protected constructor() {
    super();
  }
}
