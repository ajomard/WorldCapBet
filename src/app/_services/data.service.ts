import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  data: any;

  constructor() { }

  set(data: any) {
    this.data = data;
  }

  get(): any {
    return this.data;
  }

  delete() {
    this.data = null;
  }

}
