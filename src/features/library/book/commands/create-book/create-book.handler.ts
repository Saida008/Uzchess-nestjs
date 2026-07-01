import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../entities/book.entity';
import { Author } from '../../../entities/author.entity';
import { Category } from '../../../entities/category.entity';
import { Difficulty } from '../../../entities/difficulty.entity';

import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Difficulty)
    private readonly difficultyRepo: Repository<Difficulty>,
  ) {}

  async execute(cmd: CreateBookCommand) {
    const alreadyExists = await this.bookRepo.findOneBy({
      title: cmd.title,
    });

    if (alreadyExists) {
      throw new ConflictException('Book already exists');
    }

    const author = await this.authorRepo.findOneBy({
      id: cmd.authorId,
    });

    if (!author) throw new NotFoundException('Author not found');

    const category = await this.categoryRepo.findOneBy({
      id: cmd.categoryId,
    });

    if (!category) throw new NotFoundException('Category not found');

    const difficulty = await this.difficultyRepo.findOneBy({
      id: cmd.difficultyId,
    });

    if (!difficulty) throw new NotFoundException('Difficulty not found');

    const book = this.bookRepo.create({
      title: cmd.title,
      author,
      category,
      difficulty,
    });

    return await this.bookRepo.save(book);
  }
}