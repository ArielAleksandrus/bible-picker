# Bible Picker  
**An Angular “datepicker-style” component for selecting Bible references**
<div align="center">
<img src="https://raw.githubusercontent.com/ArielAleksandrus/bible-picker/master/demo.png" alt="Bible Picker – Light mode" width="45%"/>
<img src="https://raw.githubusercontent.com/ArielAleksandrus/bible-picker/master/demo2.png" alt="Bible Picker – Dark mode" width="45%" style="margin-left: 20px;"/>
<br/><br/>
</div>

A clean, intuitive, cascading Bible reference picker inspired by Angular Material’s `MatDatepicker`.

### Live Demo (StackBlitz– edit & run instantly)  
https://stackblitz.com/github/ArielAleksandrus/bible-picker

### Usage

On your component's .html file: *your-component.html*
```HTML

<!-- you can use on [select]: 'book' | 'books' | 'chapter' | 'chapters' | 'verse' | 'verses' -->
<bible-picker
  [bible]="bibleData"
  [select]="verse"   
  (onSelected)="yourCallback($event)">
</bible-picker>
```

On your component's .ts file: *your-component.ts*
```Typescript
// import the bible picker and the bible version you want to use (currently only PT-Br ARA and en-UK KJV are available)
import { BiblePicker, BibleARA, BibleKJV } from 'bible-picker';
import { Bible, BibleBook, BibleSelection, SelectedText } from './bible';

// then, import it inside your component
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, BiblePicker],
  standalone: true
})

// finally, inside your component's class,
bibleData = BibleARA;

yourCallback(ref: BibleSelection) {
  console.log('Selection:', ref);
  console.log('Abbreviation: ', Bible.abbrevSelection(ref));
  console.log('Verses: ', Bible.getVerses(ref));
}
```

### Features
- Standalone component (easy to import)
- Fully offline (local JSON)
- Cascading selection: Book → Chapter → Verse
- Flexible input: stop at book, chapter or verse (`[select]` input)
- Dark / light theme support (Material)

### Included Bible Version
Import BibleARA for **Almeida Revista e Atualizada (ARA)** – Portuguese (Brazil).  
Import BibleKJV **King James Version (KJV)** – English.

### Installation

```bash
npm install bible-picker --legacy-peer-deps #(because it uses angular 19 and angular material)
```

### Want a different version or language?
Pull requests are very welcome!

- Almeida Revista e Corrigida (ARC)
- Nova Versão Internacional (NVI)
- Integration with online APIs

### Contributing
- Report bugs or request features
- Submit new translations / languages
- Improve UI/UX

All contributions are appreciated!

### License
MIT © Ariel Aleksandrus

Thank you for using and helping improve Bible Picker!
