import {Component} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: 'test.html',
  styleUrls: ['./test.scss'],

})
export class TestComponent {
  public translate: string;
  public translateWords = ['яблоко', 'рука', 'нога'];

  constructor() {

  }


  public wordSelected(translate) {

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
