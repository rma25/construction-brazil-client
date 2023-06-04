import { Component, OnInit } from '@angular/core';
import { ActiveRouteService } from 'src/app/services/active-route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isNavbarCollapsed: boolean = true;
  public activeRoute: string = '';

  constructor(private activeRouteService: ActiveRouteService) {}

  ngOnInit(): void {
    this.activeRouteService.activeRoute.subscribe((activeRoute) => {
      this.activeRoute = activeRoute;
    });
  }
}
