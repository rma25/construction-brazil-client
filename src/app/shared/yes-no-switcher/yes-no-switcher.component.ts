import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-yes-no-switcher',
  templateUrl: './yes-no-switcher.component.html',
  styleUrls: ['./yes-no-switcher.component.css'],
})
export class YesNoSwitcherComponent implements OnInit {
  @Input() yesNo: boolean;
  @Output() yesNoChange = new EventEmitter<boolean>();

  public isYes: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isYes = this.yesNo;
  }

  public onChange(): void {
    this.yesNoChange.emit(this.isYes);
  }
}
