import {Injectable, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;

export interface DataWordType {
  word: string;
  translateWords: Array<string>;
}

@Injectable()
export class DictionaryService implements OnInit {

  private DictionaryCollection: AngularFirestoreCollection<DataWordType>;
  notes: Observable<DataWordType[]>;

  constructor(private storage: LocalStorageService,
              private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.getDict();
  }

  getDict(): Observable<DataWordType[]> {
    this.DictionaryCollection = this.afs.collection('dictionary', ref => {
      return ref.orderBy('word');
    });
    this.notes = this.DictionaryCollection.valueChanges();
    return this.notes;
  }

  saveWord(wordAndTranslate): Promise<DocumentReference> {
    return this.DictionaryCollection.add(wordAndTranslate);
  }

  deleteWord(key: string): Promise<void> {
    const wordInDict = this.DictionaryCollection.doc(key).delete();
    return wordInDict;
  }

  updateWord(wordAndTranslate): Promise<void> {
    const wordInDict = this.DictionaryCollection.doc(wordAndTranslate.word).update(wordAndTranslate);
    return wordInDict;
  }

}

