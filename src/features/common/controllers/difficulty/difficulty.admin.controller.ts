import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { DifficultyAdminService } from '../../services/difficulty/difficulty.admin.service';
import { storageOptions } from '../../../../configs/multer.config';
import { DifficultyCreateAdminDto } from '../../dtos/difficulty/admin/difficulty.create.admin.dto';
import { DifficultyListAdminDto } from '../../dtos/difficulty/admin/difficulty.list.admin.dto';
import { DifficultyUpdateAdminDto } from '../../dtos/difficulty/admin/difficulty.update.admin.dto';

@ApiTags('Difficulty - Admin')
@ApiBearerAuth()
@Controller('admin/difficulty')
@Roles(Role.Admin, Role.SuperAdmin)
export class DifficultyAdminController {
  constructor(private readonly service: DifficultyAdminService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions }))
  async create(@Body() payload: DifficultyCreateAdminDto, @UploadedFile() icon: Express.Multer.File) {
    return await this.service.create(payload, icon);
  }

  @Get()
  @ApiOkResponse({ type: [DifficultyListAdminDto] })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DifficultyListAdminDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions }))
  async updateOne(
    @Param('id') id: number,
    payload: DifficultyUpdateAdminDto,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    return await this.service.updateOne(id, payload, icon);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deleteOne(id);
  }
}
