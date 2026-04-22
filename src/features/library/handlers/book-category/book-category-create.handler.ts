import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { BookCategoryCreateCommand } from '../../commands/book-category/book-category-create.command';
import { BookCategoryRepository } from '../../repositories/book-category.repository';
import { BookCategory } from '../../entities/book-category.entity';

@CommandHandler(BookCategoryCreateCommand)
export class BookCategoryCreateHandler implements ICommandHandler<BookCategoryCreateCommand> {
  constructor(private readonly repo: BookCategoryRepository) {}

  async execute(command: BookCategoryCreateCommand) {
    let alreadyExists = await this.repo.existsByTitle(command.payload.title);
    // @ts-ignore
    if (alreadyExists) {
      throw new BadRequestException('Already exists');
    }

    let newBookCategory = command.payload as BookCategory;
    return await this.repo.save(newBookCategory);
  }
}
