import { Module } from "@nestjs/common";
import { RegisterHandler } from "./register/register.handler";
import { UserController } from "./register/user.controller";
import { LoginHandler } from "./login/login.handler";


@Module({
    controllers:[
        UserController
    ],
    providers:[
        RegisterHandler,
        LoginHandler,
    ]
})
export class AuthModule{
    
}