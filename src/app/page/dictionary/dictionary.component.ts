import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DictionaryService} from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit {

  constructor(public dictionary: DictionaryService) {}

  ngOnInit() {
  }


}
