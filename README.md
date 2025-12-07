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
<app-bible-picker
  [bible]="bibleData"
  [select]="'verse'"   <!-- optional: 'book' | 'chapter' | 'verse' -->
  (onSelected)="onVerseSelected($event)">
</app-bible-picker>
```

On your component's .ts file: *your-component.ts*
```Typescript
// Load the default ARA Bible (or any other)
bibleData = import('../assets/bible-ara.json');

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
npm install
ng serve
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
