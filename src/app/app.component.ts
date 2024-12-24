import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiblePickerComponent } from './bible-picker/bible-picker.component';

import { Bible, BibleBook, BibleSelection } from './bible-picker/bible';

import bibleARA from "./assets/bibles/bible-ara.json";

@Component({
  selector: 'app-root',
  imports: [CommonModule, BiblePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bible-picker';


  bible: Bible = <Bible>bibleARA;

  selection?: BibleSelection;

  constructor() {

  }

  showSelection(data: BibleSelection) {
    this.selection = data;
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
}
