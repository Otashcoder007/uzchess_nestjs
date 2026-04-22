import { Command } from '@nestjs/cqrs';
import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '../../entities/book-category.entity';

export class BookCategoryCreateCommand extends Command<BookCategory> {
  constructor(public readonly payload: BookCategoryCreateDtoAdmin) {
    super();
  }
}
