import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../common/dtos/paginated-result.dto';
import { PaginationFilters } from '../../../common/filters/pagination.filters';

export class BookCategoryGetAllQuery extends Query<PaginatedResult> {
  constructor(public readonly filters: PaginationFilters) {
    super();
  }
}
