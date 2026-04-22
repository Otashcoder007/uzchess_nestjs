import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { CourseCategory } from '../../entities/course-category.entity';
import { CourseCategoryAdminRepository } from '../../repositories/course-category.admin.repository';
import {
  CourseCategoryCreateAdminDto,
  CourseCategoryListAdminDto,
  CourseCategoryUpdateAdminDto,
} from '../../dtos/course-category';
import { PaginationFilters } from '../../../common/filters/pagination.filters';

@Injectable()
export class CourseCategoryAdminService {
  constructor(private readonly repo: CourseCategoryAdminRepository) {}

  async create(payload: CourseCategoryCreateAdminDto) {
    const courseCategory = CourseCategory.create(payload as CourseCategory);
    return await this.repo.create(courseCategory);
  }

  async updateOne(id: number, payload: CourseCategoryUpdateAdminDto) {
    const courseCategory = await this.repo.getOneById(id);
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    courseCategory.title = payload.title;
    await this.repo.save(courseCategory);
    return courseCategory;
  }

  async getAll(filters: PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data = plainToInstance(CourseCategoryListAdminDto, result.data);
    return result;
  }

  async deleteOne(id: number) {
    const courseCategory = await CourseCategory.findOneBy({ id });
    if (!courseCategory) {
      throw new NotFoundException('CourseCategory with given id not found');
    }

    try {
      await CourseCategory.remove(courseCategory);
    } catch (exc) {
      throw new BadRequestException(`CourseCategory couldn't be deleted: ${exc}`);
    }
  }
}
