export class DeleteReviewCommand {
  constructor(
    public readonly userId: number,
    public readonly bookId: number,
  ) {}
}