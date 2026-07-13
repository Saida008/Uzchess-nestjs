import { BaseModel } from "@core/configs/base.model";
import { Column, Entity, OneToMany } from "typeorm";
import { RolePermission } from "./role.permission.entity";
import { UserPermission } from './user.permission.entity';
@Entity('permission')
export class Permission extends BaseModel{
    @Column({length:64})
    resource:string;

    @Column({length:64})
    action:string;

    @OneToMany(()=>RolePermission, (rp)=>rp.permission)
    rolePermissions:RolePermission[];

    @OneToMany(()=>UserPermission, (ur)=>ur.permission)
    userPermissions:UserPermission[]
}