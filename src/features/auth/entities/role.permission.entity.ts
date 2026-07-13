import { BaseModel } from "@core/configs/base.model";
import { Column, Entity, JoinColumn, ManyToOne, UsingJoinColumnIsNotAllowedError } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";
import { permission } from "process";
//Role-Based Access Control
@Entity('rolePermisson')
export class RolePermission extends BaseModel{
    @Column()
    roleId:number;

    @ManyToOne(()=>Role, (role)=>role.rolePermissions, {onDelete:'CASCADE'})
    @JoinColumn({name:'roleId'})
    role:Role

    @Column()
    permissionId:number;

    @ManyToOne(()=>Permission, (permission)=>permission.rolePermissions, {onDelete:'CASCADE'})
    @JoinColumn({name:'permissionId'})
    permission:Permission
}