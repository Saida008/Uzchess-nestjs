// import { LanguageCreateDto } from "@features/common/dtos/language/language.create.dto";
// import { LanguageUpdateDto } from "@features/common/dtos/language/language.update.dto";
// import { ConflictException, Controller, NotFoundException, ParseIntPipe } from "@nestjs/common";
// import { title } from "process";
// import { ILike } from "typeorm";




// @Controller('Languages')
// export class LanguageController{
//     @Post ('create')
//     async create (@Body () payload:LanguageCreateDto){
//         const titleExists=await Language.existsBy({title:ILike(payload:title)});
//        if(titleExists) 
//         throw  new ConflictException('Title already exists ')
//         const codeExists=await Language.existsBy({code:ILike(payload:code)});
//         if(codeExists)
//          throw  new ConflictException('Code already exists ');
//         //1-usul
//         // const newLanguage={title: payload.title, code:payload.code} as Language;
//        //2-usul
//         // const newLanguage=new Language()
//         // newLanguage.title=payload.title;
//         // newLanguage.code=payload.code;

//         //3-usul
//         const newLanguage=Language.create({title:payload.title, code:payload.code})
//         await Language.save(newLanguage);
//         return newLanguage;
//     }


//     @Patch(update/:id)
//     async update(@Param('id', ParseIntPipe)id:number, @Body() payload:LanguageUpdateDto){
//       const language=await  Language.findOneBy({id})
//       if(!language)
//         throw new NotFoundException('Language with given id not found.');

//     //   Object.assign(
//     //     language,
//     //     Object.fromEntries(Object.entries(payload).filter(([key,value])=>value !=null ))

//         if(payload.title)
//             language.title=payload.title;

//         if(payload.code)
//             language.code=payload.code;

//           const titleExists=await Language.existsBy({id:Not (language.id),
//              title:ILike(language:title)});

//        if(titleExists) 
//         throw  new ConflictException('Title already exists ')

//         const codeExists=await Language.existsBy({id:Not(language.id),
//             code:ILike(language:code)});

//         if(codeExists)
//          throw  new ConflictException('Code already exists ');

      
//         await Language.save(language;
//             return language;
//         )
      
//     }
// }
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ILike, Not } from 'typeorm';

import { LanguageCreateDto } from '@features/common/dtos/language/language.create.dto';
import { LanguageUpdateDto } from '@features/common/dtos/language/language.update.dto';
import { Language } from '@features/common/entities/language.entity';
import { plainToInstance } from 'class-transformer';
import { LanguageListDto } from '@features/common/dtos/language/language.list.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('languages')
export class LanguageController {
  @Get('list')
  @ApiOkResponse({type:LanguageListDto, isArray:true})
  async getAll() {
    const languages = await Language.find();

    // return languages.map((language) => ({
    //   id: language.id,
    //   title: language.title,
    //   code: language.code,
    // }));
    return plainToInstance (LanguageListDto, languages, {excludeExtraneousValues:true,})
  }

  @Post('create')
  @ApiOperation({summary:'BU yerda summary yoziladi', description:"BU yerda esa uzunroq qilib description yoziladi"})
  async create(@Body() payload: LanguageCreateDto) {
    const titleExists = await Language.existsBy({
      title: ILike(payload.title),
    });

    if (titleExists) {
      throw new ConflictException('Title already exists');
    }

    const codeExists = await Language.existsBy({
      code: ILike(payload.code),
    });

    if (codeExists) {
      throw new ConflictException('Code already exists');
    }

    const newLanguage = Language.create({
      title: payload.title,
      code: payload.code,
    });

    await newLanguage.save();

    return newLanguage;
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: LanguageUpdateDto,
  ) {
    const language = await Language.findOneBy({ id });

    if (!language) {
      throw new NotFoundException('Language with given id not found.');
    }

    if (payload.title) {
      const titleExists = await Language.existsBy({
        id: Not(language.id),
        title: ILike(payload.title),
      });

      if (titleExists) {
        throw new ConflictException('Title already exists');
      }

      language.title = payload.title;
    }

    if (payload.code) {
      const codeExists = await Language.existsBy({
        id: Not(language.id),
        code: ILike(payload.code),
      });

      if (codeExists) {
        throw new ConflictException('Code already exists');
      }

      language.code = payload.code;
    }

    await language.save();

    return language;
  }
}