import { BaseModel } from "@core/configs/base.model";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Permission } from "./permission.entity";
import { permission } from "process";
import { User } from './user.entity';
@Entity('userPermissoin')
export class UserPermission extends BaseModel{
    @Column()
    userId:number;

    @ManyToOne(()=>User, (user)=>user.userPermissions, {onDelete:'CASCADE'})
    @JoinColumn({name:'userId'})
    user:User;

    @Column()
    permissionId:number;

    @ManyToOne(()=>Permission, (permission)=>permission.userPermissions,{onDelete:'CASCADE'})
    @JoinColumn({name:'permissionId'})
    permission:Permission;

    @Column()
    isAllowed:boolean;
}