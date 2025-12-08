import { Component, input, output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';


import { Bible, BibleBook, BibleSelection, SelectedText } from './bible';

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
  selectedBookEndIdx: number = 0;
  hoveredBook: number = 0;
  hoveredChapter: number = 0;
  hoveredVerse: number = 0;

  selectedBookStart?: BibleBook;
  selectedChapterStart?: number;
  selectedVerseStart?: number;

  selectedBookEnd?: BibleBook;
  selectedChapterEnd?: number;
  selectedVerseEnd?: number;

  onSelected = output<BibleSelection>();

  stage: 'book'|'chapter'|'verse' = 'book';
  ready = false;
  disable = false;

  constructor() {

  }

  ngOnInit() {

  }

  send() {
    let res: BibleSelection = {
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
      this.hoveredBook = this.hoveredChapter = 0;
      this.disable = this.ready = false;
      this.stage = "book";
    }
  }

  hoverBook(idx: number) {
    if(!this.disable && !this.selectedBookEnd) {
      this.hoveredBook = idx;
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
      this.hoveredBook = 0;
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
      this.selectedBookStartIdx = this.bible().books.indexOf(this.selectedBookStart);

      this.selectedBookEnd = book;
      this.selectedBookEndIdx = this.bible().books.indexOf(book);;


      if(this.selectedBookStartIdx > this.selectedBookEndIdx) {
        this.selectedBookStart = this.selectedBookEnd;
        this.selectedBookEnd = undefined;
        this.hoveredBook = 0;
      } else if(this.selectedBookStartIdx == this.selectedBookEndIdx && this.select() == "any") {
        this.stage = 'chapter';
      } else {
        this.ready = this.disable = true;
        this.hoveredBook = this.selectedBookEndIdx;
      }
    }
  }

  selectChapter(chapter: number) {
    // if both are set, we will override selection
    if(this.selectedChapterStart && this.selectedChapterEnd) {
      this.selectedChapterStart = this.selectedChapterEnd = undefined;
      this.hoveredChapter = 0;
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
        this.hoveredChapter = 0;
      } else if(this.selectedChapterStart == this.selectedChapterEnd && this.select() == "any") {
        this.stage = 'verse';
      } else {
        this.ready = this.disable = true;
        this.hoveredChapter = this.selectedChapterEnd - 1;
      }
    }
  }

  selectVerse(verse: number) {
    // if both are set, we will override selection
    if(this.selectedVerseStart && this.selectedVerseEnd) {
      this.selectedVerseStart = this.selectedVerseEnd = undefined;
      this.hoveredVerse = 0;
    }

    if(!this.selectedVerseStart || this.select() == "verse") {
      this.selectedVerseStart = verse;

      switch(this.select()) {
        case "verse": {
          this.ready = this.disable = true;
          break;
        }
        case "verses":
        case "any": {
          this.ready = true;
          break;
        }
        default: {
          this.stage = 'verse';
        }
      }
    } else {
      this.selectedVerseEnd = verse;

      if(this.selectedVerseStart > this.selectedVerseEnd) {
        this.selectedVerseStart = this.selectedVerseEnd;
        this.selectedVerseEnd = undefined;
        this.hoveredVerse = 0;
      } else if(this.selectedVerseStart == this.selectedVerseEnd && this.select() == "any") {
        this.stage = 'verse';
      } else {
        this.hoveredVerse = this.selectedVerseEnd - 1;
        this.ready = this.disable = true;
      }
    }
  }
}
