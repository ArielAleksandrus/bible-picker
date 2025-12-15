import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiblePickerComponent, OverridableCSS } from './bible-picker/bible-picker.component';

import { Bible, BibleBook, BibleSelection, SelectedText } from './bible-picker/bible';

import { Observable } from 'rxjs';

import { BiblePicker } from 'bible-picker';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, BiblePickerComponent,
    //this is our npm package imported
    BiblePicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bible-picker';

  available = [{
    version: "Portugues ARA",
    url: "https://pub-7db5ca77d7e14ca79a36013b9fc40870.r2.dev/jsons/pt-ara.json"
  }, {
    version: "English NIV",
    url: "https://pub-7db5ca77d7e14ca79a36013b9fc40870.r2.dev/jsons/en-niv.json"
  }, {
    version: "Español NVI",
    url: "https://pub-7db5ca77d7e14ca79a36013b9fc40870.r2.dev/jsons/es-nvi.json"
  }, {
    version: "Chinese CNVS - 新译本（简体）",
    url: "https://pub-7db5ca77d7e14ca79a36013b9fc40870.r2.dev/jsons/zh-cnvs.json"
  }];

  bible?: Bible;

  bibles: {version: string, bible: Bible}[] = [];

  selection0?: string;
  selection1?: string;
  selection2?: string;
  selection3?: string;
  selection4?: string;

  customCSS = <OverridableCSS>{"b": {}, "c": {}, "v": {}};

  constructor(private http: HttpClient) {

  }

  selectBible(evt: any) {
    let version = evt.target.value;
    if(!version) {
      this.bible = undefined;
      return;
    }

    let found = this.bibles.find(bible => bible.version === version);
    if(found) {
      this.bible = found.bible;
      return;
    }

    let aux = this.available.find(item => item.version === version);
    if(!aux)
      return;

    this.http.get<Bible>(aux.url).subscribe({
      next: (data: Bible) => {
        this.bible = data;
      },
      error: (err: any) => {
        console.error(`Erro ao baixar ${version}:`, err);
      }
    });
  }

  showSelection(data: BibleSelection, idx: number = 1) {
    console.log("Selection: ", data);

    //@ts-ignore
    this[`selection${idx}`] = Bible.abbrevSelection(data);

    //@ts-ignore
    console.log("Verses: ", Bible.getVerses(data));
  }

  seeWhatsSelecting(data: BibleSelection) {
    if(data.books[0] && data.books[0].abbrev == "Is") {
      this.customCSS = <OverridableCSS>{"b": {}, "c": {0: "background-color: red", 1: "background-color: yellow", 2: "background-color: green"}, "v": {}};
      if(data.chapters.indexOf(9) > -1) {
        this.customCSS = <OverridableCSS>{"b": {}, "c": {}, "v": {10: "background-color: brown;color: white", 11: "background-color: magenta", 12: "background-color: pink"}};
      }
    } else {
      this.customCSS = <OverridableCSS>{"b": {}, "c": {}, "v": {}};
    }
    console.log("Selecting...", data);
  }


  snippet = 
`{
    version: "ara", /* Three letters abbreviation like 'kjv', 'acf', 'ara' */
    language: "pt-br", /* Downcase language abbreviation '-' country, like: 'en-us', 'pt-pt', 'es-ar' */
    books: [{ 
      abbrev: "Gn",
      name: "Genesis",
      chapters: [ /* Array of chapters */
            [ /* Chapter 01. Array of verses. Every verse is a string*/
              "No princípio, criou Deus os céus e a terra.", /* Ch.01 Verse 01 */
              "A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.", "Disse Deus: Haja luz; e houve luz.",
              ...
            ],
            [ /* Chapter 02. */
              "Assim, pois, foram acabados os céus e a terra e todo o seu exército.", /* Ch.02 Verse 01 */
              ...
            ]
      ]
    }]
}`
  snippet1 = `
{
  "b": {1: "background-color: red"}, // the second book will have red background
  "c": {5: "color: brown", 6: "color: brown"}, // all chapters 5 and 6 of every book will have a brown number color
  "v": {0: "background-color: blue;color: pink"} // every first verse will have a blue background and a pink number color
}`
  snippet2 =
`{
  books: [{
    abbrev: "Gn",
    chapters: [["<The text of Gn 1:1>", "<The text of Gn 1:2>", ...], ["<The text of Gn 2:1>", "<The text of Gn 2:2>", ...], ...],
    name: "Genesis"
  }],
  chapters: [1],
  verses: [5,6,7,8]
}`

  snippet3 =
`Bible.abbrevSelection(selection) -> "Gn 1:5-8"

Bible.getVerses-> [
  {
    "abbrev": "Gn",
    "text": [
      [
        "Mas uma neblina subia da terra e regava toda a superfície do solo.",
        "Então, formou o SENHOR Deus ao homem do pó da terra e lhe soprou nas narinas o fôlego de vida, e o homem passou a ser alma vivente.",
        "E plantou o SENHOR Deus um jardim no Éden, na direção do Oriente, e pôs nele o homem que havia formado.",
        "Do solo fez o SENHOR Deus brotar toda sorte de árvores agradáveis à vista e boas para alimento; e também a árvore da vida no meio do jardim e a árvore do conhecimento do bem e do mal."
      ]
    ]
  }
]`
}
