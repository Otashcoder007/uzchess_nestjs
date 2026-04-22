import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import {Language} from "../../entities/language.entity";
import {LanguageListPublicDto} from "../../dtos/language/public/language.list.public.dto";

@Injectable()
export class LanguagePublicService {
  async getAll() {
    const languages = await Language.find();
    return plainToInstance(LanguageListPublicDto, languages);
  }
}
