import { BaseModel } from '@core/configs/base.model';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user.role.entity';
import { UserPermission } from './user.permission.entity';
import { Role } from "@core/enums/role.enum";
import { Like } from '@/features/library/entities/like.entity';
import { Review } from '@/features/library/entities/review.entity';
@Entity('users')
export class User extends BaseModel {
  @Column({ length: 64, unique: true })
  username: string;

  @Column({length:128, select:false})
  password: string;

  @Column({
  length: 64,
  nullable: true,
})
fullname?: string;

  @Column({
    type:"enum", 
    enum:Role,
  enumName:'user_role'
})
  role?:Role;


  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles?: UserRole[];

  @OneToMany(() => UserPermission, (up) => up.user)
  userPermissions?: UserPermission[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
