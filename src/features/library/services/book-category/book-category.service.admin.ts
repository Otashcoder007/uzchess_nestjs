import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategory } from '../../entities/book-category.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookCategoryUpdateDtoAdmin } from '../../dtos/book-category/admin/book-category.update.dto.admin';
import { Not } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { BookCategoryListDtoAdmin } from '../../dtos/book-category/admin/book-category.list.dto.admin';
import { CommandBus } from '@nestjs/cqrs';
import { PaginationFilters } from '../../../common/filters/pagination.filters';

@Injectable()
export class BookCategoryServiceAdmin {
  constructor(private readonly commandBus: CommandBus) {}

  async create(payload: BookCategoryCreateDtoAdmin) {
    // @ts-ignore
    return await this.commandBus.execute(new BookCategoryCreateDtoAdmin(payload));
  }

  async update(id: number, payload: BookCategoryUpdateDtoAdmin): Promise<BookCategory> {
    let bookCategory = await BookCategory.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    let alreadyExists = await BookCategory.countBy({
      id: Not(id),
      title: payload.title,
    });
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    bookCategory.title = payload.title;
    await BookCategory.save(bookCategory);
    return bookCategory;
  }

  async getAll(filters: PaginationFilters) {
    let bookCategories = await BookCategory.find();
    let data = plainToInstance(BookCategoryListDtoAdmin, bookCategories, {
      excludeExtraneousValues: true,
    });
    return data;
  }

  async delete(id: number): Promise<undefined> {
    let bookCategory = await BookCategory.findOneBy({ id });
    if (!bookCategory) {
      throw new NotFoundException('Does not exist');
    }

    await BookCategory.remove(bookCategory);
  }
}
