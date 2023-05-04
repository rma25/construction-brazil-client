import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.css"],
})
export class PageNotFoundComponent {
  private pageX: number = window.innerWidth;
  private pageY: number = window.innerHeight;

  public ghostEyeCoordinates: string = "";

  constructor(private location: Location) {}

  // Listens to mouse move so the ghost eyes follow the mouse
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: { pageY: any; pageX: number }) {
    // verticalAxis
    const mouseY = event.pageY;
    const yAxis = ((this.pageY / 2 - mouseY) / this.pageY) * 300;

    // horizontalAxis
    const mouseX = event.pageX / -this.pageX;
    const xAxis = -mouseX * 100 - 100;

    this.ghostEyeCoordinates = "translate(" + xAxis + "%,-" + yAxis + "%)";
  }

  public onGoBack(): void {
    this.location.back();
  }
}
