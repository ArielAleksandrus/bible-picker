# BiblePicker

This project was made with *Angular 19* and *Angular Material*.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

Download the dependencies with

```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

## Where is the component?

The bible-picker component will be under `src/app/bible-picker`

## Usage

You will need to import the component in your project. Please use the project's example.

You will need to use the `<app-bible-picker [bible]="bibleJsonObj" (onSelected)="yourCallbackFunction($event)"></app-bible-picker>`

You can select `book` or `books`, `chapter` or `chapters`, `verse` or `verses`, or `any`. To do so, you will need the "select" directive:

`<app-bible-picker select="chapters" [bible]="bibleJsonObj" (onSelected)="yourCallbackFunction($event)"></app-bible-picker>`
