import {Component} from '@angular/core';
import {TestService} from '../../services/test-services';

@Component({
  selector: 'app-test',
  templateUrl: 'test.html',
  styleUrls: ['./test.scss'],

})
export class TestComponent {
  public translate: string;
  public translateWords = ['яблоко', 'рука', 'нога'];

  private _testLevel: number = 0;
  public totalLevel: number = 20;
  public task;
  public word;
  public answerWord;
  constructor(public testService: TestService) {}

  get testLevel() {
    return this._testLevel;
  }

  nextLevel() {
    // this.task = this.testService.getRandomWords(1);

    ++this._testLevel;
    this.testService.getTask(6);
    console.log('this.word', this.word);
    console.log('this.translate', this.translate);
    console.log('this.answerWord', this.answerWord);


  }

  getAnswer() {
    this.testService.getTask(6).subscribe( data => console.log('subs', data) );
  }

  startTest() {
    this.nextLevel();
    this.testService.getTask(6);

  }

  saveAnswer() {

  }

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
}
