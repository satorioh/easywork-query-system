import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-daterangepicker';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  data: Observable<any>;
  records = [];
  startDate: string;
  endDate: string;
  hasRangeSelected = true;

  constructor(
    public http: Http,
    public recordService: RecordService
  ) {

  }

  ngOnInit() {
    $('#reservation').daterangepicker({
      'locale': {
        'format': 'YYYY/MM/DD',
        'separator': ' - ',
        'applyLabel': '确定',
        'cancelLabel': '取消',
        'fromLabel': 'From',
        'toLabel': 'To',
        'customRangeLabel': 'Custom',
        'weekLabel': 'W',
        'daysOfWeek': [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'
        ],
        'monthNames': [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        'firstDay': 1
      }
    }, (start, end, label) => {
      console.log(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      this.startDate = start.format('YYYY-MM-DD');
      this.endDate = end.format('YYYY-MM-DD');
      this.hasRangeSelected = true;
    });
  }

  query() {
    if (!this.startDate || !this.endDate) {
      this.hasRangeSelected = false;
    } else {
      this.data = this.http.get(`/api/queryData.php?startDate=${this.startDate}&endDate=${this.endDate}`).map(response => response.json());
      this.data.subscribe(data => {
        this.recordService.setRecord(data);
        console.log(this.recordService.getRecord());
      });
    }
  }
}
