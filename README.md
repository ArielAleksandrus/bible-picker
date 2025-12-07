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
  [select]="'verse'"   
  (onSelected)="onVerseSelected($event)">
</bible-picker>
```

On your component's .ts file: *your-component.ts*
```Typescript
// import the bible picker and the bible version you want to use (currently only PT-Br ARA is available)
import { BiblePicker, BibleARA } from 'bible-picker';

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

onVerseSelected(ref: any) {
  console.log('Selected:', ref);
  // Example output:
  // { book: "Gênesis", abbreviation: "Gn", chapter: 1, verse: 1, text: "No princípio, criou Deus..." }
}
```

### Features
- Standalone component (easy to import)
- Fully offline (local JSON)
- Cascading selection: Book → Chapter → Verse
- Flexible input: stop at book, chapter or verse (`[select]` input)
- `(onSelected)` output with complete reference + verse text
- Dark / light theme support (Material)

### Included Bible Version
The default Bible data is **Almeida Revista e Atualizada (ARA)** – Portuguese (Brazil).  
The full JSON (66 books, all chapters and verses) is located at `src/assets/bible-ara.json`.

### Installation

```bash
npm install bible-picker --legacy-peer-deps
```

### Want a different version or language?
Pull requests are very welcome!

- Almeida Revista e Corrigida (ARC)
- Nova Versão Internacional (NVI)
- King James Version (KJV), Reina-Valera, etc.
- Integration with online APIs

Just add a new JSON file following the same structure as `bible-ara.json`.

### Contributing
- Report bugs or request features
- Submit new translations / languages
- Improve UI/UX

All contributions are appreciated!

### License
MIT © Ariel Aleksandrus

Thank you for using and helping improve Bible Picker!
