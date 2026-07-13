export class CreateReviewCommand {
  constructor(
    public readonly rating: number,
    public readonly comment: string,
    public readonly userId: number,
    public readonly bookId: number,
  ) {}
}