import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class RecordService {
  records = [];
  recordChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  getRecord() {
    return this.records;
  }

  setRecord(arr) {
    this.records = arr;
    this.recordChange.emit(this.records);
  }
}
