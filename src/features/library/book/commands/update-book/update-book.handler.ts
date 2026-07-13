import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../entities/book.entity';
import { Author } from '../../../entities/author.entity';
import { Category } from '../../../entities/category.entity';
import { Difficulty } from '../../../entities/difficulty.entity';

import { UpdateBookCommand} from './update-book.command';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler
  implements ICommandHandler<UpdateBookCommand>
{
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

  async execute(cmd: UpdateBookCommand) {
    const book = await this.bookRepo.findOne({
      where: { id: cmd.id },
      relations: ['author', 'category', 'difficulty'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (cmd.title && cmd.title !== book.title) {
      const alreadyExists = await this.bookRepo.findOneBy({
        title: cmd.title,
      });

      if (alreadyExists) {
        throw new ConflictException('Book already exists');
      }

      book.title = cmd.title;
    }

    if (cmd.authorId) {
      const author = await this.authorRepo.findOneBy({
        id: cmd.authorId,
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      book.author = author;
    }

    if (cmd.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: cmd.categoryId,
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      book.category = category;
    }

    if (cmd.difficultyId) {
      const difficulty = await this.difficultyRepo.findOneBy({
        id: cmd.difficultyId,
      });

      if (!difficulty) {
        throw new NotFoundException('Difficulty not found');
      }

      book.difficulty = difficulty;
    }

    return await this.bookRepo.save(book);
  }
}