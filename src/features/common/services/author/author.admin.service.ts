import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthorCreateAdminDto } from '../../dtos/author/admin/author.create.admin.dto';
import { Author } from '../../entities/author.entity';
import { AuthorUpdateAdminDto } from '../../dtos/author/admin/author.update.admin.dto';
import { AuthorListAdminDto } from '../../dtos/author/admin/author.list.admin.dto';

@Injectable()
export class AuthorAdminService {
  async create(payload: AuthorCreateAdminDto) {
    const author = Author.create(payload as Author);
    await Author.save(author);
    return author;
  }

  async updateOne(id: number, payload: AuthorUpdateAdminDto) {
    const author = await Author.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    author.fullName = payload.fullName;
    await Author.save(author);
    return author;
  }

  async getAll() {
    const authors = await Author.find();
    return plainToInstance(AuthorListAdminDto, authors);
  }

  async deleteOne(id: number) {
    const author = await Author.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author with given id not found');
    }

    try {
      await Author.remove(author);
    } catch (exc) {
      throw new BadRequestException(`Author couldn't be deleted: ${exc}`);
    }
  }
}
