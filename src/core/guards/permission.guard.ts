// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   Inject,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import type { Cache } from 'cache-manager';

// import { PermissionKey } from '../decorators/permission.decorator';
// import { Permission } from '@/features/auth/entities/permission.entity';

// @Injectable()
// export class PermissionGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,

//     @Inject(CACHE_MANAGER)
//     private readonly cache: Cache,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.switchToHttp().getRequest();

//     const permissions = this.reflector.getAllAndOverride<string>(
//       PermissionKey,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!permissions) {
//       return true;
//     }

//     const [resource, action] = permissions.split(':');

//     // let userPermissions: Permission[] | undefined = await this.cache.get(
//     //   `permissions:${req.user.id}`,
//     // );

//     // if (!userPermissions) {
//       const allowedPermissions = await Permission.findBy({
//         userPermissions: {
//           userId: req.user.id,
//           isAllowed: true,
//         },
//       });

//       const deniedPermissions = await Permission.findBy({
//         userPermissions: {
//           userId: req.user.id,
//           isAllowed: false,
//         },
//       });
//       const rolePermissions = await Permission.findBy({
//         rolePermissions: {
//           role: {
//             userRoles: {
//               userId: req.user.id,
//             },
//           },
//         },
//       });

//        let userPermissions = [
//         ...allowedPermissions.filter(
//           (perm) => !deniedPermissions.some((d) => d.id === perm.id),
//         ),
//         ...rolePermissions.filter(
//           (perm) => !deniedPermissions.some((d) => d.id === perm.id),
//         ),
//       ];

//       await this.cache.set(
//         `permissions:${req.user.id}`,
//         userPermissions,
//         60 * 60 * 1000,
//       );
//     }

//     return  userPermissions.some(
//       (perm:Permission) => perm.resource === resource && perm.action === action,
//     );
//   }
//  }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

import { PermissionKey } from '../decorators/permission.decorator';
import { Permission } from '@/features/auth/entities/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
  private readonly reflector: Reflector,

  @Inject(CACHE_MANAGER)
  private readonly cache: Cache,
) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const permissions = this.reflector.get(PermissionKey, context.getHandler());
    if (!permissions) {
      return true;
    }

    const [resource, action] = permissions.split(':');

    let userPermissions:any=await this.cache.get(`permissios: ${req.user.id}`)
    if(!userPermissions){
      const allowedPermissions = await Permission.findBy({ userPermissions: { userId: req.user.id, isAllowed: true } });
    const deniedPermissions = await Permission.findBy({ userPermissions: { userId: req.user.id, isAllowed: false } });
    const rolePermissions = await Permission.findBy({
        rolePermissions: { role: { userRoles: { userId: req.user.id } } },
      },
    );

    userPermissions = [
      ...allowedPermissions.filter(perm => !deniedPermissions.some(denied => denied.id === perm.id)),
      ...rolePermissions.filter(perm => !deniedPermissions.some(denied => denied.id === perm.id)),
    ];
    
    await this.cache.set(`permissions:${req.user.id}`, userPermissions)
  }
   
  

    return userPermissions.some((perm: Permission) => perm.resource === resource && perm.action === action);
  }
}

