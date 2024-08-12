import { Inject, Injectable } from '@angular/core';
import { DOCUMENT_SESSION_STORAGE } from '@azlabsjs/ngx-storage';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(@Inject(DOCUMENT_SESSION_STORAGE) private storage: Storage) {}

  setItem(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data));
  }
  getItem(key: string) {
    return this.storage.getItem(key);
  }
  deleteItem(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
  length() {
    return this.storage.length;
  }

  parse(data: string | null) {
    return data !== null ? JSON.parse(data) : {};
  }

  stringify(data: object) {
    return JSON.stringify(data);
  }
}
