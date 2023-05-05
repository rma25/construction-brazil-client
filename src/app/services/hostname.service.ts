import { Inject, Injectable } from '@angular/core';

import { WINDOW } from '../providers/window.provider';

@Injectable()
export class HostNameService {
  constructor(@Inject(WINDOW) private window: Window) {}

  getHostname(): string {
    return this.window.location.hostname;
  }

  getOrigin(): string {
    return this.window.location.origin;
  }
}
