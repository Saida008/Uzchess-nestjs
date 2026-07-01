export class UpdateDifficultyCommand {
  constructor(
    public readonly id: number,
    public readonly title?: string,
  ) {}
}