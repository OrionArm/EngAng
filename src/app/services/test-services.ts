import {Injectable, OnInit} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {DataWordType, DictionaryService} from './dictionary.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import {Router} from '@angular/router';

interface IAnswer {
  word: string;
  answer: string;
  level: number;
  complete?: boolean;
}

export class Answer {
  constructor(public word: string,
              public answer: string,
              public level: number,
              public complete?: boolean) {}
}


@Injectable()
export class TestService {
  private taskObj = {
    subject: '',
    answer: '',
    variant: []
  };
  private _testLevel: number = 0;
  public totalLevel: number = 20;
  dictionary: Observable<DataWordType[]>;
  questionnaireCollect: AngularFirestoreCollection<IAnswer>;

  constructor(public dictionaryService: DictionaryService,
              private afs: AngularFirestore,
              private router: Router) {
    this.questionnaireCollect = this.afs.collection('questionnaire');
  }

  static randomIndex = (array) => Math.floor(Math.random() * array.length);
  static addIndexes = (array) => array.map((item, index) => {
    item['id'] = index;
    return item;
  });
  static removeIndexes = (array) => array.map(item => {
    delete item.id;
    return item;
  });


  get testLevel() {
    return this._testLevel;
  }

  startTest() {
    this._testLevel = 1;
  }

  finishTest() {
    const promise = Promise.resolve(this.router.navigate(['test/results']));
    return promise;
  }

  getRandomWords(countWords: number): Observable<DataWordType> {
    this.dictionary = this.dictionaryService.getDict();
    const randomWords = () =>
      this.dictionary.mergeMap(array =>
        Rx.Observable.of(array)
          .map(TestService.addIndexes)
          .map(r => r[TestService.randomIndex(r)])
          .repeat()
          .scan((a, c) => a.map(a => a.id).indexOf(c.id) === -1 ? a.concat(c) : a, [])
          .skipWhile(array => array.length < countWords)
          .take(1)
          .map(TestService.removeIndexes)
      );

    return randomWords();
  }

  getRandomAnswer(countWords: number) {
    function getArrayRandomTranslate(array) {
      const answer = [];
      array.forEach((words) => {
        const randomIndex = TestService.randomIndex(words.translateWords);
        answer.push(words.translateWords[randomIndex]);
      });
      return answer;
    }

    return this.getRandomWords(countWords).map(getArrayRandomTranslate);

  }

  getTask(countVariant: number): Observable<DataWordType> {
    const wordData = this.getRandomWords(1).map(
      note => {
        const word = note[0].word;
        const translate = note[0].translateWords;
        const randomIndex = TestService.randomIndex(translate);
        const answerWord = translate[randomIndex];
        return {word: word, answerWord: answerWord};
      });
    const variant = this.getRandomAnswer(countVariant);

    const task = wordData.mergeMap(
      wordAndAnswer => {
        return variant.map(othersVariant => {
          const cleanVariants = othersVariant.filter(e => e !== wordAndAnswer.answerWord);
          cleanVariants.push(wordAndAnswer.answerWord);
          if (cleanVariants.length > countVariant) {
            const needVariant = cleanVariants.length - countVariant;
            cleanVariants.splice(0, needVariant);
          }
          cleanVariants.sort();
          this.taskObj.subject = wordAndAnswer.word;
          this.taskObj.answer = wordAndAnswer.answerWord;
          this.taskObj.variant = cleanVariants;
          return {word: wordAndAnswer.word, translateWords: cleanVariants};
        });
      });
    return task;
  }

  checkAnswer(translate: string): Promise<DocumentReference> | Promise<boolean> {
    if (this._testLevel < this.totalLevel) {
      ++this._testLevel;
      if (translate === this.taskObj.answer) {
        const answer = new Answer(this.taskObj.subject, translate, this._testLevel, true);
        return this.saveAnswer(answer);
      } else {
        const answer = new Answer(this.taskObj.subject, translate, this._testLevel, false);
        return this.saveAnswer(answer);
      }
    }
    return this.finishTest();
  }

  saveAnswer(answer: Answer): Promise<DocumentReference> {
    return this.questionnaireCollect.add({...answer});
  }

  getQuestionnaire(): Observable<any> {
    return this.questionnaireCollect.valueChanges();
  }

}

