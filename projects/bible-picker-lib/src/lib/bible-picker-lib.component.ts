import { Component, input, output } from '@angular/core';

import { Bible, BibleBook, BibleSelection, SelectedText } from './bible';

export type OverridableCSS = {
  "b": {[idx: number]: string},
  "c": {[idx: number]: string},
  "v": {[idx: number]: string}
};


const bibleTerms = {
  book: {
    "en": "books",
    "pt-br": "livros",
    "es": "libros",
    "zh": "书"  // Em chinês, "书" já é usado tanto no singular quanto no plural em contextos bíblicos
  },
  chapter: {
    "en": "chapters",
    "pt-br": "capítulos",
    "es": "capítulos",
    "zh": "章"
  },
  verse: {
    "en": "verses",
    "pt-br": "versículos",
    "es": "versículos",
    "zh": "节"
  }
};

@Component({
  selector: 'bible-picker',
  imports: [],
  templateUrl: './bible-picker-lib.component.html',
  styleUrl: './bible-picker-lib.component.scss'
})
export class BiblePicker {
  bible = input.required<Bible>();
  select = input<'book'|'books'|'chapter'|'chapters'|'verse'|'verses'|'any'>('any');
  customCSS = input<OverridableCSS>({"b": {}, "c": {}, "v": {}});


  selectedBookStartIdx: number = -1;
  selectedBookEndIdx: number = -1;
  hoveredBook: number = -1;
  hoveredChapter: number = -1;
  hoveredVerse: number = -1;

  selectedBookStart?: BibleBook;
  selectedChapterStart: number = -1;
  selectedVerseStart: number = -1;

  selectedBookEnd?: BibleBook;
  selectedChapterEnd: number = -1;
  selectedVerseEnd: number = -1;

  onSelecting = output<BibleSelection>();
  onSelected = output<BibleSelection>();

  stage: 'book'|'chapter'|'verse' = 'book';
  title: string = "Book";
  disable = true;

  constructor() {

  }

  ngOnInit() {
    this.changeTitle();
  }

  send(final: boolean) {
    let res: BibleSelection = {
      books: [],
      chapters: [],
      verses: []
    };

    let bsi = this.selectedBookStartIdx, bei = this.selectedBookEndIdx;
    let csi = this.selectedChapterStart, cei = this.selectedChapterEnd;
    let vsi = this.selectedVerseStart, vei = this.selectedVerseEnd;

    if(bei == -1)
      bei = bsi;
    for(let i = this.selectedBookStartIdx; i <= bei; i++) {
      let book: BibleBook = this.bible().books[i];
      if(book)
        res.books.push(book);
    }

    if(csi > -1) {
      if(cei == -1)
        cei = csi;
      for(let i = csi; i <= cei; i++) {
        res.chapters.push(i);
      }
    }
    if(vsi > -1) {
      if(vei == -1)
        vei = vsi;
      for(let i = vsi; i <= vei; i++) {
        res.verses.push(i);
      }
    }



    if(final){
      this.onSelected.emit(res);
    }
    else
      this.onSelecting.emit(res);
  }

  changeTitle() {
    //@ts-ignore
    this.title = bibleTerms[this.stage][this.bible().language] || '';
    if(this.stage == "chapter")
      this.title += ` (${this.selectedBookStart?.abbrev})`;
    else if(this.stage == "verse") {
      this.title += ` (${this.selectedBookStart?.abbrev}.${this.selectedChapterStart})`;
    }
  }

  goBack() {
    this.disable = true;
    if(this.stage == "verse") {
      this.selectedVerseStart = this.selectedVerseEnd = this.selectedChapterStart = this.selectedChapterEnd = this.hoveredChapter = -1;
      this.stage = "chapter";
    } else if(this.stage == "chapter") {
      this.selectedBookStart = this.selectedBookEnd = undefined;
      this.selectedBookStartIdx = this.selectedBookEndIdx = -1;
      this.selectedChapterStart = this.selectedChapterEnd = this.hoveredBook = this.hoveredChapter = -1;
      this.disable = true;
      this.stage = "book";
    }
    this.changeTitle();
    this.send(false);
  }

  hoverBook(idx: number) {
    let sel = this.select();
    let si = this.selectedBookStartIdx;
    let ei = this.selectedBookEndIdx;

    if(si >= 0 && ei == -1) { // só se start is set e end is not set.
      if(sel != "book") // só se sel não for book, porque se for, o usuário não pode ver hover ao arrastar o mouse para clicar em ok
        this.hoveredBook = idx;
    }
  }
  hoverChapter(idx: number) {
    let sel = this.select();
    if(this.selectedChapterStart >= 0 && this.selectedChapterEnd == -1) {
      if(sel != "chapter")
        this.hoveredChapter = idx;
    }
  }
  hoverVerse(idx: number) {
    let sel = this.select();
    if(this.selectedVerseStart >= 0 && this.selectedVerseEnd == -1) {
      if(sel != "verse")
        this.hoveredVerse = idx;
    }
  }


  selectBook(book: BibleBook): any {
    let si = this.selectedBookStartIdx;
    let ei = this.selectedBookEndIdx;
    const i = this.bible().books.indexOf(book);
    const sel: "book"|"books"|"chapter"|"chapters"|"verse"|"verses"|"any" = this.select();

    this.disable = true;

    if(si == -1) {
      this.selectedBookStart = book;
      si = this.selectedBookStartIdx = i;
      if(sel == "any") {
        this.disable = false;
        this.send(false);
        return;
      } else if(sel == "book") {
        this.send(true);
        return;
      } else if(sel == "books") {
        this.send(false);
        return;
      } else {
        this.selectedBookEnd = book;
        this.selectedBookEndIdx = i;
        this.stage = "chapter";
        this.changeTitle();
        this.send(false);
        return;
      }
    }

    if(ei == -1) {
      //this.selectedBookEnd = book;
      ei = this.selectedBookEndIdx = i;
      if(ei < si) {
        this.selectedBookStart = undefined;
        this.selectedBookStartIdx = -1;
        this.selectBook(book);
        return;
      } else if(ei == si) {
        if(sel == "any") {
          this.stage = "chapter";
          this.changeTitle();
          this.send(false);
          return;
        }
      }
      this.selectedBookEnd = book;
      this.selectedBookEndIdx = i;
      this.disable = false;
      this.send(false);
      return;
    }

    if(si > -1 && ei > -1) {
      this.selectedBookStart = this.selectedBookEnd = undefined;
      this.selectedBookStartIdx = this.selectedBookEndIdx = this.hoveredBook = -1;
      this.selectBook(book);
      return;
    }
  }

  selectChapter(chapter: number) {
    let si = this.selectedChapterStart;
    let ei = this.selectedChapterEnd;
    const i = chapter;
    const sel: "book"|"books"|"chapter"|"chapters"|"verse"|"verses"|"any" = this.select();

    this.disable = true;

    if(si == -1) {
      si = this.selectedChapterStart = i;
      if(sel == "any") {
        this.disable = false;
        this.send(false);
        return;
      } else if(sel == "chapter") {
        this.send(true);
        return;
      } else if(sel == "chapters") {
        this.send(false);
        return;
      } else {
        this.selectedChapterEnd = i;
        this.stage = "verse";
        this.changeTitle();
        this.send(false);
        return;
      }
    }

    if(ei == -1) {
      ei = this.selectedChapterEnd = i;
      if(ei < si) {
        this.selectedChapterStart = this.selectedChapterEnd = -1;
        this.selectChapter(chapter);
        return;
      } else if(ei == si) {
        if(sel == "any") {
          this.stage = "verse";
          this.changeTitle();
          this.send(false);
          return;
        }
      }
      this.selectedChapterEnd = i;
      this.disable = false;
      this.send(false);
      return;
    }

    if(si > -1 && ei > -1) {
      this.selectedChapterStart = this.selectedChapterEnd = this.hoveredChapter = -1;
      this.selectChapter(chapter);
      return;
    }
  }

  selectVerse(verse: number) {
    let si = this.selectedVerseStart;
    let ei = this.selectedVerseEnd;
    const i = verse;
    const sel: "book"|"books"|"chapter"|"chapters"|"verse"|"verses"|"any" = this.select();

    this.disable = true;

    if(si == -1) {
      si = this.selectedVerseStart = i;
      if(sel == "any") {
        this.disable = false;
        this.send(false);
        return;
      } else if(sel == "verse") {
        this.send(true);
        return;
      } else if(sel == "verses") {
        this.send(false);
        return;
      } else {
        // will never reach here.
      }
    }

    if(ei == -1) {
      ei = this.selectedVerseEnd = i;
      if(ei < si) {
        this.selectedVerseStart = this.selectedVerseEnd = -1;
        this.selectVerse(verse);
        return;
      } else if(ei == si) {
        if(sel == "any") {
          this.send(false);
          return;
        }
      }
      this.selectedVerseEnd = i;
      this.disable = false;
      this.send(false);
      return;
    }

    if(si > -1 && ei > -1) {
      this.selectedVerseStart = this.selectedVerseEnd = this.hoveredVerse = -1;
      this.selectVerse(verse);
      return;
    }
  }
}
