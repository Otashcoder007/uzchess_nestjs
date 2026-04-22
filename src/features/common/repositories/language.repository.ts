import { BaseRepository } from '../../../core/repositories/base-repository';
import { Author } from '../entities/author.entity';

export abstract class LanguageRepository extends BaseRepository<Author> {
  protected constructor() {
    super();
  }
}
