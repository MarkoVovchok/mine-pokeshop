import { Injectable } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveToLocal<T>(key: LocalStorageKeys, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocal<T>(key: LocalStorageKeys): T {
    let obj: T = undefined;
    let temp = localStorage.getItem(key);
    if (temp) {
      obj = JSON.parse(temp);
    }
    return obj;
  }
}
