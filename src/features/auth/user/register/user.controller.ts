import { Body, Controller, Post } from "@nestjs/common";
import { RegisterRequest } from "./register.request";
import { CommandBus} from "@nestjs/cqrs";
import { LoginRequest } from "../login/login.request";

@Controller('auth')

export class UserController{
    constructor(
  private readonly cmdBus: CommandBus,

) {}
    @Post('register')
    async register (@Body() payload:RegisterRequest){
       return await this.cmdBus.execute(payload.toCommand())
    }
    @Post('login')
    async login(@Body() payload:LoginRequest){
        return await this.cmdBus.execute(payload.toCommand());
    }
}