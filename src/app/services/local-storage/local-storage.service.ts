import { Injectable } from '@angular/core';
import { LocalStorageKeys } from 'src/app/enums';
import { LoggerService } from 'src/app/logger.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private logger: LoggerService) {}

  saveToLocal<T>(key: LocalStorageKeys, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    this.logger.info('Backup saved');
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
