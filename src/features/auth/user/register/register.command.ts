export class RegisterCommand {
  constructor(
    public readonly payload: {
      username: string;
      password: string;
      fullname?: string;
    },
  ) {}
}