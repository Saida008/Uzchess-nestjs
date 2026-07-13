export class UpdateReviewCommand {
  constructor(
    public readonly userId: number,
    public readonly bookId: number,
    public readonly rating?: number,
    public readonly comment?: string,
  ) {}
}