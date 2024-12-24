import { Component, input, output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';


import { Bible, BibleBook } from './bible';

@Component({
  selector: 'app-bible-picker',
  imports: [MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './bible-picker.component.html',
  styleUrl: './bible-picker.component.scss'
})
export class BiblePickerComponent {
  bible = input.required<Bible>();
  select = input<'book'|'books'|'chapter'|'chapters'|'verse'|'verses'|'any'>('any');


  selectedBookStartIdx: number = 999;
  hoveredBookIdx: number = 0;
  hoveredChapter: number = 0;
  hoveredVerse: number = 0;

  selectedBookStart?: BibleBook;
  selectedChapterStart?: number;
  selectedVerseStart?: number;

  selectedBookEnd?: BibleBook;
  selectedChapterEnd?: number;
  selectedVerseEnd?: number;

  onSelected = output<{books: BibleBook[], chapters: number[], verses: number[]}>();

  stage: 'book'|'chapter'|'verse' = 'book';
  ready = false;
  disable = false;

  constructor() {

  }

  ngOnInit() {
    console.log(this.bible());
  }

  send() {
    let res: {
      books: BibleBook[],
      chapters: number[],
      verses: number[]
    } = {
      books: [],
      chapters: [],
      verses: []
    };

    let bookEndIdx = this.selectedBookStartIdx;
    if(this.selectedBookEnd)
      bookEndIdx = this.bible().books.indexOf(this.selectedBookEnd);

    for(let i = this.selectedBookStartIdx; i <= bookEndIdx; i++) {
      let book: BibleBook = this.bible().books[i];
      if(book)
        res.books.push(book);
    }
    if(this.selectedChapterStart) {
      for(let i = this.selectedChapterStart; i <= (this.selectedChapterEnd || this.selectedChapterStart); i++) {
        res.chapters.push(i);
      }
    }
    if(this.selectedVerseStart) {
      for(let i = this.selectedVerseStart; i <= (this.selectedVerseEnd || this.selectedVerseStart); i++) {
        res.verses.push(i);
      }
    }

    this.onSelected.emit(res);
  }

  goBack() {
    if(this.stage == "verse") {
      this.selectedVerseStart = this.selectedVerseEnd = this.selectedChapterStart = this.selectedChapterEnd = undefined;
      this.disable = this.ready = false;
      this.hoveredChapter = 0;
      this.stage = "chapter";
    } else if(this.stage == "chapter") {
      this.selectedChapterStart = this.selectedChapterEnd = this.selectedBookStart = this.selectedBookEnd = undefined;
      this.selectedBookStartIdx = 999;
      this.hoveredBookIdx = this.hoveredChapter = 0;
      this.disable = this.ready = false;
      this.stage = "book";
    }
  }

  hoverBook(idx: number) {
    if(!this.disable && !this.selectedBookEnd) {
      this.hoveredBookIdx = idx;
    }
  }
  hoverChapter(idx: number) {
    if(!this.disable && !this.selectedChapterEnd) {
      this.hoveredChapter = idx;
    }
  }
  hoverVerse(idx: number) {
    if(!this.disable && !this.selectedVerseEnd) {
      this.hoveredVerse = idx;
    }
  }

  selectBook(book: BibleBook) {
    // if both are set, we will override selection
    if(this.selectedBookStart && this.selectedBookEnd) {
      this.selectedBookStart = this.selectedBookEnd = undefined;
    }

    if(!this.selectedBookStart || this.select() == "book") {
      this.selectedBookStart = book;
      this.selectedBookStartIdx = this.bible().books.indexOf(book);

      switch(this.select()) {
        case "book": {
          this.ready = this.disable = true;
          break;
        }
        case "books":
        case "any": {
          this.ready = true;
          break;
        }
        default: {
          this.stage = 'chapter';
          break;
        }
      }
    } else {
      this.selectedBookEnd = book;

      let idxStart = this.bible().books.indexOf(this.selectedBookStart);
      let idxEnd = this.bible().books.indexOf(book);

      if(idxStart > idxEnd) {
        this.selectedBookStart = this.selectedBookEnd;
        this.selectedBookEnd = undefined;
      } else if(idxStart == idxEnd && this.select() == "any") {
        this.stage = 'chapter';
      } else {
        this.ready = this.disable = true;
      }
    }
  }

  selectChapter(chapter: number) {
    // if both are set, we will override selection
    if(this.selectedChapterStart && this.selectedChapterEnd) {
      this.selectedChapterStart = this.selectedChapterEnd = undefined;
    }

    if(!this.selectedChapterStart || this.select() == "chapter") {
      this.selectedChapterStart = chapter;
    
      switch(this.select()) {
        case "chapter": {
          this.ready = this.disable = true;
          break;
        }
        case "chapters":
        case "any": {
          this.ready = true;
          break;
        }
        default: {
          this.stage = 'verse';
        }
      }
    } else {
      this.selectedChapterEnd = chapter;

      if(this.selectedChapterStart > this.selectedChapterEnd) {
        this.selectedChapterStart = this.selectedChapterEnd;
        this.selectedChapterEnd = undefined;
      } else if(this.selectedChapterStart == this.selectedChapterEnd && this.select() == "any") {
        this.stage = 'verse';
      } else {
        this.ready = this.disable = true;
      }
    }
  }

  selectVerse(verse: number) {
    // if both are set, we will override selection
    if(this.selectedVerseStart && this.selectedVerseEnd) {
      this.selectedVerseStart = this.selectedVerseEnd = undefined;
    }

    if(!this.selectedVerseStart || this.select() == "verse") {
      this.selectedVerseStart = verse;

      if(this.select() == "verse") {
        this.ready = this.disable = true;
      } else {
        this.ready = true;
      }
    } else {
      this.selectedVerseEnd = verse;

      if(this.selectedVerseStart > this.selectedVerseEnd) {
        this.selectedVerseStart = this.selectedVerseEnd;
        this.selectedVerseEnd = undefined;
      } else if(this.selectedVerseStart < this.selectedVerseEnd) {
        this.ready = this.disable = true;
      }
    }
  }
}
