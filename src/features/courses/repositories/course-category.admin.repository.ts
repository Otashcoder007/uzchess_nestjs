import { Injectable } from '@nestjs/common';
import { CourseCategory } from '../entities/course-category.entity';
import { PaginationFilters } from '../../common/filters/pagination.filters';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../common/dtos/paginated-result.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseCategoryAdminRepository {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(CourseCategory)
    private readonly repo: Repository<CourseCategory>,
  ) {}

  async create(courseCategory: CourseCategory) {
    return await this.repo.save(courseCategory);
  }

  async getOneById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async getAll(filters: PaginationFilters) {
    const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
    const skip = (currentPage - 1) * take;
    const totalCount = await CourseCategory.count();
    const totalPages = Math.ceil(totalCount / take);
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const data = await this.repo.find({ take: take, skip: skip });
    return { totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
  }

  async save(courseCategory: CourseCategory) {
    return await this.repo.save(courseCategory);
  }
}
