import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-word-dictionary',
  template: `<mat-list-item>{{ translate }}</mat-list-item>\n`,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class WordDictionaryComponent implements OnInit {
  @Input() word: string;
  @Input() translate: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
