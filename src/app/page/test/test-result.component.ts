import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Answer, TestService} from '../../services/test-services';
import {Observable} from 'rxjs/Observable';
// import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-test-result',
  templateUrl: 'test-result.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class TestResultComponent implements OnInit {
  public testResults: Observable<Answer[]>;
  // dataSource: MatTableDataSource;
  ArrayOfResults;

  constructor(public testService: TestService) {
  }

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    this.testResults = this.testService.getQuestionnaire();
    const ELEMENT_DATA = this.testResults.subscribe( data => this.ArrayOfResults = data);
    // this.dataSource = new MatTableDataSource(this.ArrayOfResults);
  }

}
