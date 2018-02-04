import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {DataWordType, DictionaryService} from './dictionary.service';

@Injectable()
export class TestService {
  private taskObj = {
    subject : '',
    answer: '',
    variant: []
  };

  dictionary: Observable<DataWordType[]>;

  constructor(public dictionaryService: DictionaryService) {
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
        return variant.map( othersVariant => {
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
          return { word: wordAndAnswer.word, translateWords: cleanVariants };
        });
      });
    return task;
  }

  checkAnswer(answer): boolean {
    if (answer == this.taskObj.answer ) {
      return true;
    }
    return false;
  }


}

