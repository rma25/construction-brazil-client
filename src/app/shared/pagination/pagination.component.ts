import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageInfo } from './interfaces/page-info.interface';
import { PaginationService } from './services/pagination.service';

export interface IPagination {
  onPageChange(pageInfo: PageInfo): void;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalCollectionSize: number;
  @Input() paginationName: string;
  @Input() size: string;
  @Input() maxSize: number = 25;

  @Output() pageChanged = new EventEmitter<PageInfo>();

  public currentPage = 1;
  public totalPerPageFilter = 25;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {}

  public onPageChange(pageNumber: number): void {
    this.paginationService.pageInfo.next({
      pageNumber,
      totalPerPage: this.totalPerPageFilter,
    });

    // This is incase there are nested components using this
    this.pageChanged.emit({
      pageNumber,
      totalPerPage: this.totalPerPageFilter,
    });
  }
}
