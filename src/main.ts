import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from '@core/configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform: true,
  }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {prefix:'/uploads/'})
  configureSwagger(app);
  await app.listen(8000);
  
}
bootstrap();

//Authorization
//Permission-Resource, Action(Create, Read, Update, Delete)
//Role-Title, Description
//RolePermission-RoleId,, PermissionId
//UserRole-UserId, RoleId
//UserPermission-UserId, PermissonId, IsAllowed
//Many-to-many-m2m
//One-to-many

//Errors
//400-Bad request
//401-Unauthorized
//403-forbidden
//404-Not found
//405-Method Not Allowed(post un berilgan surovga get berib quyilsa)
//422-Unprocessable content
//429-Too many requests
//DDos (attack)-Distributed Denial of service
//BUnga qarshi-> API Rate Limiting/Throttling
