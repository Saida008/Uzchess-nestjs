export class CreateLikeCommand {
  constructor(
    public readonly userId: number,
    public readonly bookId: number,
  ) {}
}