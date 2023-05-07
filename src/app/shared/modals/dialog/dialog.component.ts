import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() message!: string;
  @Input() modalHeaderTitle: string;
  @Input() showYesOrNoButtons: boolean = true;

  constructor(public activeModal: NgbActiveModal) {}
}
