import {Component, OnInit} from '@angular/core';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  records = [];
  recordsGroup = [];
  hasRelatedRecords = false;
  noRecodesInfo: string;

  // pagination input varible
  total = 0;
  page = 1;
  limit = 10;

  constructor(public recordService: RecordService) {
  }

  ngOnInit() {
    this.recordService.recordChange.subscribe(data => {
      this.records = data;
      if (this.records.length > 0) {
        this.noRecodesInfo = '';
        this.total = this.records.length;
        this.recordsGroup = this.records.slice(0, this.limit);
      } else {
        this.noRecodesInfo = '查无相关记录！';
      }
    });
  }

  getRecordsGroup() {
    this.recordsGroup = this.records.slice((this.page - 1) * this.limit, this.page * this.limit);
  }

  goToPage(n: number): void {
    this.page = n;
    this.getRecordsGroup();
  }

  onNext(): void {
    this.page++;
    this.getRecordsGroup();
  }

  onPrev(): void {
    this.page--;
    this.getRecordsGroup();
  }

}
