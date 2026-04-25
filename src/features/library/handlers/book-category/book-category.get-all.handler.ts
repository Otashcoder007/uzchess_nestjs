import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookCategoryGetAllQuery } from '../../queries/book-category/book-category.get-all.query';
import { BookCategoryRepository } from '../../repositories/book-category.repository';

@QueryHandler(BookCategoryGetAllQuery)
export class BookCategoryGetAllHandler implements IQueryHandler<BookCategoryGetAllQuery> {
  constructor(private readonly repo: BookCategoryRepository) {}

  async execute(query: BookCategoryGetAllQuery) {
    return await this.repo.getAll(query.filters);
  }
}