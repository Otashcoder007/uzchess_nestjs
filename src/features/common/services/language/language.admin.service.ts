import { plainToInstance } from 'class-transformer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {Language} from "../../entities/language.entity";
import {LanguageListAdminDto} from "../../dtos/language/admin/language.list.admin.dto";
import {LanguageCreateAdminDto} from "../../dtos/language/admin/language.create.admin.dto";
import {LanguageUpdateAdminDto} from "../../dtos/language/admin/language.update.admin.dto";

@Injectable()
export class LanguageAdminService {
  async create(payload: LanguageCreateAdminDto) {
    const alreadyExists = await Language.query('SELECT COUNT(id) FROM languages WHERE title ILIKE $1 OR code ILIKE $2', [
      payload.title,
      payload.code,
    ]);

    if (alreadyExists) {
      throw new BadRequestException('Language with given title or code already exists');
    }

    const newLanguage = Language.create(payload as Language);
    await Language.save(newLanguage);
    return newLanguage;
  }

  async updateOne(id: number, payload: LanguageUpdateAdminDto) {
    const language = await Language.findOneBy({ id });
    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }

    if (payload.title) {
      const alreadyExists = await Language.countBy({ title: payload.title });
      if (alreadyExists) {
        throw new BadRequestException('Language with given title already exists');
      }
    }

    if (payload.code) {
      const alreadyExists = await Language.countBy({ code: payload.code });
      if (alreadyExists) {
        throw new BadRequestException('Language with given code already exists');
      }
    }

    Object.assign(language, Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)));

    await Language.save(language);
    return language;
  }

  async getAll() {
    const languages = await Language.find();
    return plainToInstance(LanguageListAdminDto, languages);
  }

  async deleteOne(id: number) {
    const language = await Language.findOneBy({ id });
    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }
    try {
      await Language.remove(language);
    } catch (exc) {
      throw new BadRequestException(`Language couldn't be deleted: ${exc}`);
    }
  }
}
