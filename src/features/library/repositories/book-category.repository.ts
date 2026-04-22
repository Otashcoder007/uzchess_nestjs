import { BaseRepository } from '../../../core/repositories/base-repository';
import { BookCategory } from '../entities/book-category.entity';
import { ConfigService } from '@nestjs/config';

export abstract class BookCategoryRepository extends BaseRepository<BookCategory> {
  protected constructor(
    protected config: ConfigService,
    // @InjectRepository
  ) {
    super();
  }

  async existsByTitle(title: string) {}
}
