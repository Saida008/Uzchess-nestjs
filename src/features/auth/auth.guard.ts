import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import { PermissionKey } from "@/core/decorators/permission.decorator";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly reflector:Reflector
    ) {
    }
canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
      console.log(req.headers.authorization);
    if (!req.headers.authorization)
        throw new UnauthorizedException();

    const [bearer, token] = req.headers.authorization.split(" ");

    if (!bearer || bearer !== 'Bearer' || !token)
        throw new UnauthorizedException();

    try {
        // @ts-ignore
        req.user = this.jwtService.verify(token);
        return true;
    } catch {
        throw new UnauthorizedException();
    }
}
}