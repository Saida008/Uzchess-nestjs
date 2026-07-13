export class UpdateBookCommand{
    constructor(
        public readonly id:number,
        public readonly title?:string,
        public readonly authorId?:number,
        public readonly categoryId?:number,
        public readonly difficultyId?:number

    ){

    }
}