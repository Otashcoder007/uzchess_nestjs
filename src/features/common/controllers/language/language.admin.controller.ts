import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { LanguageAdminService } from '../../services/language/language.admin.service';
import { LanguageCreateAdminDto } from '../../dtos/language/admin/language.create.admin.dto';

@ApiTags('Language - Admin')
@ApiBearerAuth()
@Controller('admin/language')
@Roles(Role.Admin, Role.SuperAdmin)
export class LanguageAdminController {
  constructor(private readonly service: LanguageAdminService) {}

  @Post()
  async create(@Body() payload: LanguageCreateAdminDto) {
    return await this.service.create(payload);
  }

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Patch('id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() payload: LanguageCreateAdminDto) {
    return await this.service.updateOne(id, payload);
  }

  @Delete('id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deleteOne(id);
  }
}
