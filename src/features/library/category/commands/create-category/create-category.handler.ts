import { Category } from "@features/library/entities/category.entity";
import { CreateCategoryCommand } from "./create-category.command";
import { ILike } from "typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { CommandHandler,ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<Category>{
    async execute(cmd:CreateCategoryCommand){
          const alreadyExists=await Category.existsBy({title: ILike (cmd.title)});
          if(alreadyExists)
            throw new ConflictException('Title already exists');

          const newCategory=Category.create({title:cmd.title});
          await Category.save(newCategory);
          return newCategory;
    }
}