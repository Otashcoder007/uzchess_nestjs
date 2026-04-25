import { ILike, Not } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserListAdminDto } from '../dtos/user/admin/user.list.admin.dto';
import { UserUpdateAdminDto } from '../dtos/user/admin/user.update.admin.dto';
import { UserCreateAdminDto } from '../dtos/user/admin/user.create.admin.dto';
import { UserRepository } from '../repositories/user.repository';

export class AuthenticationAdminService {
  constructor(private readonly repo: UserRepository) {}

  async create(payload: UserCreateAdminDto, profileImage?: Express.Multer.File) {
    const alreadyExists = await User.countBy({ login: ILike(payload.login) });
    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = User.create(payload);

    if (profileImage) {
      newUser.profileImage = profileImage.path;
    }

    if (payload.password) {
      newUser.password = await argon2.hash(payload.password);
    }
    await User.save(newUser);
    return newUser;
  }

  async updateOne(id: number, payload: UserUpdateAdminDto, profileImage?: Express.Multer.File) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (payload.login) {
      const alreadyExists = await User.countBy({ id: Not(user.id), login: ILike(payload.login) });
      if (alreadyExists) {
        throw new BadRequestException('Login already exists');
      }
    }

    Object.assign(
      user,
      Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined)),
    );

    if (payload.password) {
      user.password = await argon2.hash(payload.password);
    }

    if (profileImage) {
      user.profileImage = profileImage.path;
    }

    await User.save(user);
    return user;
  }

  async getAll() {
    const users = await User.find();
    return plainToInstance(UserListAdminDto, users);
  }

  async deleteOne(id: number) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    await User.remove(user);
  }

  async setPassword(id: number, password: string) {
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    user.password = await argon2.hash(password);

    await User.save(user);
  }
}
