import {Injectable} from '@angular/core';

interface dataWord {
  word: string;
  translateWords: Array<string>;
}

@Injectable()
export class DictionaryService {

  constructor() {
  }

  saveWord(data: dataWord): boolean {
    console.log(data);
    return false;
  }

  deleteWord(data: dataWord): boolean {
    return false;
  }

  // showDictionary(): Array<dataWord> {
  //   return
  // }

}
