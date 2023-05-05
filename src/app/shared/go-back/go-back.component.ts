import { Component, Input } from '@angular/core';

import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css'],
})
export class GoBackComponent {
  @Input() routePath!: string;
  @Input() pageTitle!: string;

  constructor(private routingService: RoutingService) {}

  public onRouteClick(route: string) {
    this.routingService.onRoute(route, false, '');
  }
}
