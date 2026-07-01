export class CreateBookCommand {
  constructor(
    public readonly title: string,
    public readonly authorId: number,
    public readonly categoryId: number,
    public readonly difficultyId: number,
  ) {}
}