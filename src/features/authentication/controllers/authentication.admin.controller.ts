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
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';
import { storageOptions } from '../../../configs/multer.config';
import { AuthenticationAdminService } from '../services/authentication.admin.service';
import { UserCreateAdminDto } from '../dtos/user/admin/user.create.admin.dto';
import {UserListAdminDto} from "../dtos/user/admin/user.list.admin.dto";
import {UserUpdateAdminDto} from "../dtos/user/admin/user.update.admin.dto";

@ApiTags('Auth - Admin')
@ApiBearerAuth()
@Controller('admin/auth')
@Roles(Role.Admin, Role.SuperAdmin)
export class AuthenticationAdminController {
  constructor(private readonly service: AuthenticationAdminService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage', { storage: storageOptions }))
  async create(@Body() payload: UserCreateAdminDto, @UploadedFile() profileImage?: Express.Multer.File) {
    return await this.service.create(payload, profileImage);
  }

  @Get()
  @ApiOkResponse({ type: () => UserListAdminDto, isArray: true })
  async getAll() {
    return await this.service.getAll();
  }

  @Patch('id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage', { storage: storageOptions }))
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    payload: UserUpdateAdminDto,
    @UploadedFile() profileImage?: Express.Multer.File,
  ) {
    return await this.service.updateOne(id, payload, profileImage);
  }

  @Delete('id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deleteOne(id);
  }

  @Post(':id/:password')
  async setPassword(@Param('id') id: number, @Param('password') password: string) {
    return await this.service.setPassword(id, password);
  }
}
