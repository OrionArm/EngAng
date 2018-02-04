import {Component, OnInit} from '@angular/core';
import {TestService, Answer} from '../../services/test-services';
import {DataWordType} from '../../services/dictionary.service';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;


@Component({
  selector: 'app-test',
  templateUrl: 'test.html',
  styleUrls: ['./test.scss'],

})
export class TestComponent implements OnInit {
  public totalLevel: number;
  public task: DataWordType;
  public answerWord: string;
  public getTask;
  public level: number;
  constructor(public testService: TestService) {
    this.totalLevel = this.testService.totalLevel;
  }

  ngOnInit() {
    this.getTask = () => this.testService.getTask(6);
  }

  get testLevel() {
    this.level = this.testService.testLevel;
     return this.level;
  }


  nextLevel() {
    this.saveAnswer();
    this.getAnswer();
  }

  getAnswer() {
    return this.getTask().subscribe( data => this.task = data );
  }

  startTest() {
    this.getAnswer();
    this.testService.startTest();
  }

  saveAnswer(): Promise<DocumentReference> | Promise<boolean> {
    return this.testService.checkAnswer(this.answerWord);
  }


}
