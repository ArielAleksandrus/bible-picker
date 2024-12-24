export type BibleBook = {
	abbrev: string,
	name: string,
	chapters: Array<Array<string>>
}
export type BibleJSON = {
	version: string,
	language: string,
	books: BibleBook[]
}
export class Bible {
	version: string = 'none'; // 'Almeida Revista Atualizada (ARA)', 'Almeida Corrigida Fiel (ACF)', etc
	language: string = 'none'; // 'pt-br', 'en-us', etc
	books: BibleBook[] = [];
}
