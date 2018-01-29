import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {DictionaryService} from '../../services/dictionary.service';

@Component({
  selector: 'app-word-saver',
  templateUrl: 'wordSaver.html'
})
export class WordSaverComponent implements OnInit {
  alreadySubmitted: boolean = false;
  orderForm: FormGroup;

  // items: any = [];

  constructor(public fb: FormBuilder, public dictionary: DictionaryService) {
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      word: ['', [Validators.required]],
      translate: ['', [Validators.required]],
      additionalTranslate: this.fb.array([])
    });
  }


  removeTranslate(index) {
     (<FormArray>this.orderForm.get('additionalTranslate')).removeAt(index);

  }

  addTranslate() {
    const control = new FormControl();
    (<FormArray>this.orderForm.get('additionalTranslate')).push(control);
  }

  saveWord() {
    let fullTranslate: any = [];
    this.alreadySubmitted = true;
    const additionalTranslate = this.orderForm.value.additionalTranslate;
    if (additionalTranslate.length === 0) {
      fullTranslate = this.orderForm.value.translate;
    } else {
      fullTranslate[0] = this.orderForm.value.translate;
      const translateWords = _cleanArray(additionalTranslate);
      fullTranslate.push(...translateWords);
    }
    const wordAndTranslate = {
      word: this.orderForm.value.word,
      translateWords: fullTranslate
    };

    this.dictionary.saveWord(wordAndTranslate);

    function _cleanArray(actual) {
      const newArray = [];
      for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }
      return newArray;
    }
  }

}
