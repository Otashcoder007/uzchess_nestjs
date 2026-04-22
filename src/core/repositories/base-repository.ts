import { ConfigService } from '@nestjs/config';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseModel } from '../base-model.entity';
import { PaginationFilters } from '../../features/common/filters/pagination.filters';
import { PaginatedResult } from '../../features/common/dtos/paginated-result.dto';

export abstract class BaseRepository<T extends BaseModel> {
  protected abstract config: ConfigService;
  protected abstract repo: Repository<T>;

  public async getAll(filters: PaginationFilters, whereOptions?: FindOptionsWhere<T>) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;

    const totalCount = await this.repo.count({ where: whereOptions });
    const totalPages = Math.ceil(totalCount / take);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const data = await this.repo.find({ skip: skip, take: take, where: whereOptions });

    return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }

  public async save(entity: T) {
    return await this.repo.save(entity);
  }

  public async getOneById(id: number) {
    return await this.repo.findOneBy({ id: id } as FindOptionsWhere<T>);
  }

  public async delete(entity: T) {
    return await this.repo.remove(entity);
  }
}
