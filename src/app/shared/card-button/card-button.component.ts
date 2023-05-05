import { Component, Input, OnInit } from '@angular/core';

import { RoutingService } from '../services/routing.service';
import { CardButtonInfo } from './interfaces/card-button-info.interface';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.css'],
})
export class CardButtonComponent implements OnInit {
  @Input() btnInfo!: CardButtonInfo;
  @Input() disabled: boolean = false;
  public capitalizeText = true;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {}

  public onClick() {
    this.routingService.onRoute(
      this.btnInfo.routerLink,
      !!this.btnInfo.isRouteRelative,
      this.btnInfo.externalUrl
    );
  }
}
