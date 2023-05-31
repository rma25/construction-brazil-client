import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { ToastType } from '../toasts/enums/toast-type.enum';
import { ToastService } from '../toasts/services/toast.service';
import { SaveBtnClass } from './enums/save-btn-class.enum';
import { SaveBtnIcon } from './enums/save-btn-icon.enum';
import { SaveBtnState } from './enums/save-btn-state.enum';
import { SaveBtnText } from './enums/save-btn-text.enum';
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

  public saveButtonClass: string = SaveBtnClass.DEFAULT;
  public saveButtonIcon: string = SaveBtnIcon.DEFAULT;
  public saveButtonText: string = SaveBtnText.DEFAULT;

  private dataChanged = new Subject<SaveBtnState>();

  constructor(
    private toastService: ToastService,
    private saveButtonService: SaveButtonService
  ) {
    super();
  }

  ngOnInit() {
    this.setControls();

    // Update the save button status to changed
    this.dataChanged
      .pipe(takeUntil(this.destroy))
      .subscribe((state) => this.onUpdateSaveBtn(state));
  }

  private setControls(): void {
    this.defaultSaveBtnState();
  }

  private defaultSaveBtnState(): void {
    this.saveButtonClass = this.saveButtonService.getSaveButtonClass(
      SaveBtnState.DEFAULT
    );
    this.saveButtonIcon = this.saveButtonService.getSaveButtonIcon(
      SaveBtnState.DEFAULT
    );
    this.saveButtonText = this.saveButtonService.getSaveButtonText(
      SaveBtnState.DEFAULT
    );

    if (this.initialSaveBtnText && this.initialSaveBtnText.length > 0) {
      this.saveButtonText = this.initialSaveBtnText;
    }
  }

  public onUpdateSaveBtn(state: SaveBtnState): void {
    this.saveButtonClass = this.saveButtonService.getSaveButtonClass(state);
    this.saveButtonIcon = this.saveButtonService.getSaveButtonIcon(state);
    this.saveButtonText = this.saveButtonService.getSaveButtonText(state);
  }

  public onSave(): void {
    this.isSaving = true;

    if (!this.dataRequest) {
      this.toastService.triggerToast({
        httpStatusCode: 500,
        header: ToastType.BUG,
        body: 'Não foi possível salvar. Por favor entre em contato com o administrador.',
        delay: 3000,
        type: ToastType.BUG,
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
        this.onUpdateSaveBtn(SaveBtnState.SAVED);

        this.toastService.triggerToast({
          httpStatusCode: 200,
          header: ToastType.SUCCESS,
          body: 'Mudanças salvado com sucesso.',
          delay: 3000,
          type: ToastType.SUCCESS,
        });
      });
  }

  public changeSaveBtnState(state: SaveBtnState): void {
    this.dataChanged.next(state);
  }

  public getSaveBtnIcon(): IconName {
    return this.saveButtonIcon as IconName;
  }
}
