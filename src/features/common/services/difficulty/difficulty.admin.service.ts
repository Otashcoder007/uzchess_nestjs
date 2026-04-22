import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ILike, Not } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {DifficultyCreateAdminDto} from "../../dtos/difficulty/admin/difficulty.create.admin.dto";
import {Difficulty} from "../../entities/difficulty.entity";
import {DifficultyListAdminDto} from "../../dtos/difficulty/admin/difficulty.list.admin.dto";
import {DifficultyUpdateAdminDto} from "../../dtos/difficulty/admin/difficulty.update.admin.dto";

@Injectable()
export class DifficultyAdminService {
  constructor(private readonly config: ConfigService) {}

  async create(payload: DifficultyCreateAdminDto, icon: Express.Multer.File) {
    const alreadyExists = await Difficulty.countBy({ title: payload.title });
    if (alreadyExists) {
      throw new BadRequestException('Difficulty with given title already exists');
    }

    const newDifficulty = Difficulty.create({ ...payload, icon: icon.path });
    await Difficulty.save(newDifficulty);
    return newDifficulty;
  }

  async getAll() {
    const rawDifficulties = await Difficulty.find();
    for (let difficulty of rawDifficulties) {
      difficulty.icon = this.config.getOrThrow<string>('BASE_URL') + '/' + difficulty.icon;
    }
    return plainToInstance(DifficultyListAdminDto, rawDifficulties);
  }

  async getOne(id: number) {
    const rawDifficulty = await Difficulty.findOneBy({ id });
    if (!rawDifficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    return plainToInstance(DifficultyListAdminDto, rawDifficulty);
  }

  async updateOne(id: number, payload: DifficultyUpdateAdminDto, icon?: Express.Multer.File) {
    const difficulty = await Difficulty.findOneBy({ id });
    if (!difficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }
    if (payload.title) {
      const alreadyExists = await Difficulty.countBy({ id: Not(id), title: ILike(payload.title) });
      if (alreadyExists) {
        throw new BadRequestException('Difficulty with given title already exists');
      }

      difficulty.title = payload.title;
    }

    if (icon) {
      // TODO: previous icon must be deleted before new one is saved
      difficulty.icon = icon.path;
    }

    await Difficulty.save(difficulty);
    return difficulty;
  }

  async deleteOne(id: number) {
    const difficulty = await Difficulty.findOneBy({ id });
    if (!difficulty) {
      throw new NotFoundException('Difficulty with given id not found');
    }

    // TODO: icon must also be removed

    await Difficulty.remove(difficulty);
  }
}
