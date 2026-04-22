import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { AuthorAdminService } from '../../services/author/author.admin.service';
import { AuthorCreateAdminDto } from '../../dtos/author/admin/author.create.admin.dto';
import { AuthorListAdminDto } from '../../dtos/author/admin/author.list.admin.dto';
import { AuthorUpdateAdminDto } from '../../dtos/author/admin/author.update.admin.dto';

@ApiTags('Author - Admin')
@ApiBearerAuth()
@Controller('admin/author')
@Roles(Role.Admin, Role.SuperAdmin)
export class AuthorAdminController {
  constructor(private service: AuthorAdminService) {}

  @Post()
  async create(@Body() payload: AuthorCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  @ApiOkResponse({ type: () => AuthorListAdminDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() payload: AuthorUpdateAdminDto) {
    return await this.service.updateOne(id, payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  }
}
