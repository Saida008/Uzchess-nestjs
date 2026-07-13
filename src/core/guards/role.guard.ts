import { RolesKey } from "@core/decorators/roles.decorator";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ignoreElements, Observable } from "rxjs";
import { Role } from '@/features/auth/entities/role.entity';

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
    ){
    }
    canActivate(context: ExecutionContext){
        const req:Request=context.switchToHttp().getRequest();
        const roles:Role[]=this.reflector.getAllAndOverride(RolesKey, [context.getHandler(),context.getClass()])

        if(!roles)
            return true;

        //@ts-ignore
        return Roles.includes(req.user.role)

    }


    }
