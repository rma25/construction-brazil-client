import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { ButtonService } from '../services/button.service';
import { ToastService } from '../toasts/services/toast.service';
import { SaveButtonService } from './services/save-button.service';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css'],
})
export class SaveButtonComponent
  extends AbstractBaseComponent
  implements OnInit
{
  // This is in case there is something else other than default "Save"
  @Input() initialSaveBtnText: string;
  @Input() dataRequest: () => Observable<any>;

  @Output() dataRequestResult = new EventEmitter<any>();

  public isSaving = false;

  public saveButtonClassControl: FormControl;
  public saveButtonIconControl: FormControl;
  public saveButtonTextControl: FormControl;

  private dataChangedId = new Subject<void>();

  constructor(
    private toastService: ToastService,
    private saveButtonService: SaveButtonService,
    private btnService: ButtonService
  ) {
    super();
  }

  ngOnInit() {
    this.setControls();

    // Update the save button status to changed
    this.dataChangedId.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.onUpdateSaveBtn(false);
    });

    this.saveButtonService.reset.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.setControls();
    });
  }

  private setControls(): void {
    this.saveButtonClassControl = this.btnService.getSaveButtonClassControl();
    this.saveButtonIconControl = this.btnService.getSaveButtonIconControl();
    this.saveButtonTextControl = this.btnService.getSaveButtonTextControl();

    if (this.initialSaveBtnText && this.initialSaveBtnText.length > 0) {
      this.saveButtonTextControl.setValue(this.initialSaveBtnText);
    }
  }

  public onUpdateSaveBtn(isSaved: boolean, isError: boolean = false): void {
    this.saveButtonTextControl.setValue(
      isError ? 'Erro' : isSaved ? 'Salvo' : 'Salvar Alterações'
    );
    this.saveButtonClassControl.setValue(
      this.btnService.getSaveButtonClass(isSaved, isError)
    );
    this.saveButtonIconControl.setValue(
      this.btnService.getSaveButtonIcon(isSaved, isError)
    );
  }

  public onSave(): void {
    this.isSaving = true;

    if (!this.dataRequest) {
      this.toastService.toasts.next({
        httpStatusCode: 500,
        header: 'Bug',
        body: 'Unable to save...Please contact administrator.',
        delay: 3000,
        isDanger: true,
      });
    }

    this.dataRequest()
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isSaving = false))
      )
      .subscribe((x) => {
        this.dataRequestResult.emit(x);

        this.isSaving = false;
        this.onUpdateSaveBtn(true);

        this.toastService.toasts.next({
          httpStatusCode: 200,
          header: 'Sucesso',
          body: 'Mudanças salvado com sucesso.',
          delay: 3000,
        });
      });
  }

  public changeSaveBtnState(): void {
    this.dataChangedId.next();
  }
}
