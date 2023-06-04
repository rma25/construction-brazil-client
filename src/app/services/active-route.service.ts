import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveRouteService {
  public activeRoute: Observable<string> = new BehaviorSubject('');

  constructor(private router: Router) {
    this.setup();
  }

  private setup(): void {
    // This is to capture on page refresh
    this.onPageRefresh();

    this.router.events.subscribe(() => {
      this.updateActiveRoute(this.getActiveRoute());
    });
  }

  private getActiveRoute(): string {
    let activeRoute = '';
    const url = this.router.url;
    const adminParent = '/admin';

    if (url.startsWith(adminParent)) {
      activeRoute = adminParent;
    } else {
      activeRoute = url;
    }

    return activeRoute;
  }

  private updateActiveRoute(route: string): void {
    (this.activeRoute as BehaviorSubject<string>).next(route);
  }

  private onPageRefresh(): void {
    this.updateActiveRoute(this.getActiveRoute());
  }
}
