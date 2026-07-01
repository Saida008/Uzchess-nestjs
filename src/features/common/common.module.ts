import { LanguageController } from "@features/library/controllers/language/language.controller";
import { Module } from "@nestjs/common";

@Module({controllers:[LanguageController]})
export class CommonModule{}