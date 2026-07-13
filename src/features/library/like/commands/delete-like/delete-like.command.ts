export class DeleteLikeCommand {
  constructor(
    public readonly userId: number,
    public readonly bookId: number,
  ) {}
}