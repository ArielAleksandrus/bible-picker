import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiblePickerComponent } from './bible-picker/bible-picker.component';

import { Bible, BibleBook, BibleSelection, SelectedText } from './bible-picker/bible';

import bibleARA from "./assets/bibles/bible-ara.json";

import { BiblePicker, BibleARA, BibleKJV } from 'bible-picker';

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


  bible: Bible = <Bible>BibleKJV;
  bible2: Bible = <Bible>bibleARA;

  selection1?: string;
  selection2?: string;
  selection3?: string;
  selection4?: string;

  constructor() {

  }

  showSelection(data: BibleSelection, idx: number = 1) {
    console.log("Selection: ", data);

    //@ts-ignore
    this[`selection${idx}`] = Bible.abbrevSelection(data);

    //@ts-ignore
    console.log("Verses: ", Bible.getVerses(data));
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
