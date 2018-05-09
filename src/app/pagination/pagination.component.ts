import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page: number; // 传入用户点击的页数
  @Input() total: number; // 数据总个数
  @Input() perPage: number; // 每页展示的数据个数
  @Input() pagesToShow: number; // 需要显示的分页个数

  @Output() goPrev = new EventEmitter();
  @Output() goNext = new EventEmitter();
  @Output() goPage = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  // 当前页的最小编号
  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  // 当前页的最大编号
  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.total) {
      max = this.total;
    }
    return max;
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit();
  }

  onNext(): void {
    this.goNext.emit();
  }

  totalPages(): number {
    return Math.ceil(this.total / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * this.page >= this.total;
  }

  getPages(): number[] {
    const c = Math.ceil(this.total / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 3;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
}
