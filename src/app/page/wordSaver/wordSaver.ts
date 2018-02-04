import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {DictionaryService} from '../../services/dictionary.service';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';
interface DataWordType {
  word: string;
  translateWords: Array<string>;
}

@Component({
  selector: 'app-word-saver',
  templateUrl: 'wordSaver.html'
})
export class WordSaverComponent implements OnInit {
  alreadySubmitted: boolean = false;
  orderForm: FormGroup;
  redirectUrl: string = 'dictionary';

  constructor(public fb: FormBuilder,
              public dictionaryService: DictionaryService,
              private router: Router,
              private afs: AngularFirestore) {}

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
    const fullTranslate: any = [];
    this.alreadySubmitted = true;
    const additionalTranslate = this.orderForm.value.additionalTranslate;
    if (additionalTranslate.length === 0) {
      fullTranslate.push(this.orderForm.value.translate);
    } else {
      fullTranslate[0] = this.orderForm.value.translate;
      const translateWords = _cleanArray(additionalTranslate);
      fullTranslate.push(...translateWords);
    }
    const wordAndTranslate = {
      word: this.orderForm.value.word,
      translateWords: fullTranslate
    };

    // const wordAndTranslate = {
    //   [this.orderForm.value.word]: fullTranslate
    // };
    // this.notes.subscribecribe( data => console.log( 'my observ', data ));

    this.dictionaryService.saveWord(wordAndTranslate).then(
      () => this.router.navigate([this.redirectUrl]),
      (e) => alert(e)
      );


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
