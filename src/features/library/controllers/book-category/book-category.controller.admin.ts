import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookCategoryCreateDtoAdmin } from '../../dtos/book-category/admin/book-category.create.dto.admin';
import { BookCategoryServiceAdmin } from '../../services/book-category/book-category.service.admin';
import { BookCategoryUpdateDtoAdmin } from '../../dtos/book-category/admin/book-category.update.dto.admin';
import { BookCategoryListDtoAdmin } from '../../dtos/book-category/admin/book-category.list.dto.admin';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';

@Controller('admin/book-category')
@Roles(Role.Admin, Role.SuperAdmin)
export class BookCategoryControllerAdmin {
  constructor(private readonly service: BookCategoryServiceAdmin) {}

  @Post()
  async create(@Body() payload: BookCategoryCreateDtoAdmin) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => BookCategoryListDtoAdmin, isArray: true })
  async findAll(): Promise<BookCategoryListDtoAdmin[]> {
    return await this.service.getAll();
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: BookCategoryUpdateDtoAdmin) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
