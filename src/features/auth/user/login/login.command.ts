import { LoginRequest } from './login.request';

export class LoginCommand {
  constructor(public readonly payload: LoginRequest) {}
}