import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public onRoute(
    routerLink: string,
    isRouteRelative: boolean = false,
    externalUrl?: string
  ) {
    if (externalUrl && externalUrl.length > 0) {
      let url = externalUrl;

      if (!url.includes('http')) {
        url = 'https://' + url;
      }

      window.open(url, '_blank');
    } else if (isRouteRelative) {
      this.router.navigate([routerLink], { relativeTo: this.route });
    } else {
      this.router.navigate([routerLink]);
    }
  }
}
