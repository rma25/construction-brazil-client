import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PageInfo } from '../interfaces/page-info.interface';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  // Created many for nested Pagings
  public pageInfo: Subject<PageInfo> = new Subject<PageInfo>();

  constructor() {}
}
