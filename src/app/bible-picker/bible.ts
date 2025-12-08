export type BibleBook = {
  abbrev: string,
  name: string,
  chapters: Array<Array<string>>
}
//                                 chapter 1                 chapter 2
// [{bookAbbrev: "Gn", text: [[verse 1, verse 2, ...], [verse 1, verse 2, ...]], {bookAbbrev: "Ex", text: [...]}]
export type SelectedText = {
  abbrev: string,
  text: string[][]
}
export type BibleJSON = {
  version: string,
  language: string,
  books: BibleBook[]
}
export type BibleSelection = {
  books: BibleBook[],
  chapters: number[],
  verses: number[]
};

export class Bible {
  version: string = 'none'; // 'Almeida Revista Atualizada (ARA)', 'Almeida Corrigida Fiel (ACF)', etc
  language: string = 'none'; // 'pt-br', 'en-us', etc
  books: BibleBook[] = [];

  static abbrevSelection(selection: BibleSelection) {
    let res: string = "";
    const s = selection;
    if(s.books.length > 0) {
      res = s.books[0].abbrev;
      if(s.books.length > 1) res = res + "-" + s.books[s.books.length - 1].abbrev;
    }
    if(s.chapters.length > 0) {
      res = res + " " + String(s.chapters[0]);
      if(s.chapters.length > 1) res = res + "-" + String(s.chapters[s.chapters.length - 1]);
    }
    if(s.verses.length > 0) {
      res = res + ":" + String(s.verses[0]);
      if(s.verses.length > 1) res = res + "-" + String(s.verses[s.verses.length - 1]);
    }
    return res;
  }
  static getVerses(selection: BibleSelection): SelectedText[] {
    let res: SelectedText[] = [];
    const s = selection;
    const curBook: BibleBook = s.books[0];
    if(s.books.length > 0) {
      res = [<SelectedText>{abbrev: curBook.abbrev, text: curBook.chapters}];
      if(s.books.length > 1) {
        for(let i = 1; i < s.books.length; i++) {
          res = [<SelectedText>{abbrev: s.books[i].abbrev, text: s.books[i].chapters}];
        }
      }
    }
    if(s.chapters.length > 0) {
      const curChapter: Array<string> = curBook.chapters[s.chapters[0]];
      res = [<SelectedText>{abbrev: curBook.abbrev, text: [curChapter]}];
      if(s.chapters.length > 1) {
        for(let i = 1; i < curBook.chapters.length; i++) {
          res[0].text.push(curBook.chapters[s.chapters[i]]);
        }
      }

      if(s.verses.length > 0) {
        const curVerse: string = curChapter[s.verses[0]];
        res = [<SelectedText>{abbrev: curBook.abbrev, text: [[curVerse]]}];
        if(s.verses.length > 1) {
          for(let i = 1; i < s.verses.length; i++) {
            res[0].text[0].push(curChapter[s.verses[i]]);
          }
        }
      }
    }
    return res;
  }
}
