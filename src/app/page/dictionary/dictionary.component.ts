import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataWordType, DictionaryService} from '../../services/dictionary.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DictionaryComponent implements OnInit {
  public notes: Observable<DataWordType[]>;

  constructor(public ds: DictionaryService) {

  }

  ngOnInit() {
    this.notes = this.ds.getDict();
  }


}
