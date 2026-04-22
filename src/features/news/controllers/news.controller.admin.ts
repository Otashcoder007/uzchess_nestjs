import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../configs/multer.config';
import { NewsCreateAdminDto } from '../dtos/news/admin/news.create.admin.dto';
import { NewsDetailAdminDto } from '../dtos/news/admin/news.detail.admin.dto';
import { NewsListAdminDto } from '../dtos/news/admin/news.list.admin.dto';
import { NewsUpdateAdminDto } from '../dtos/news/admin/news.update.admin.dto';
import { NewsFilter } from '../filter/news.filter';
import { NewsAdminService } from '../services/news.admin.service';

@Controller('admin/news')
@Roles(Role.Admin, Role.SuperAdmin)
@ApiTags('News - Admin')
@ApiBearerAuth()
export class NewsControllerAdmin {
  constructor(private readonly service: NewsAdminService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  async create(@Body() payload: NewsCreateAdminDto, @UploadedFile() image: Express.Multer.File) {
    return await this.service.create(payload, image);
  }

  @Get()
  @ApiOkResponse({ type: () => NewsListAdminDto, isArray: true })
  async getAll(@Query() filters: NewsFilter) {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: () => NewsDetailAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<NewsDetailAdminDto> {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: NewsUpdateAdminDto) {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
