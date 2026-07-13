import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { LanguageController } from "../library/controllers/language/language.controller";

@Module({
  imports: [
    CacheModule.register(),
  ],
  controllers: [LanguageController],
})
export class CommonModule {}