import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, Observable, of, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ISettingsRow } from 'src/app/shared/interfaces/ISettingsRow.interface';
import { RowInfo } from 'src/app/shared/interfaces/rowInfo.interface';
import { DialogMessages } from 'src/app/shared/modals/dialog/enums/dialog-messages';
import { DialogTitles } from 'src/app/shared/modals/dialog/enums/dialog-titles';
import { DialogService } from 'src/app/shared/modals/dialog/services/dialog.service';
import { SaveButtonComponent } from 'src/app/shared/save-button/save-button.component';
import { DateService } from 'src/app/shared/services/date.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionaisDeRodeioAdminDataService } from '../data/profissionais-de-rodeio-admin-data.service';
import { AdminProfissionalDeRodeio } from '../models/admin-profissional-de-rodeio.model copy';

@Component({
  selector:
    '[app-profissionais-de-rodeio-row], app-profissionais-de-rodeio-row',
  templateUrl: './profissionais-de-rodeio-row.component.html',
  styleUrls: ['./profissionais-de-rodeio-row.component.css'],
})
export class ProfissionaisDeRodeioRowComponent
  extends AbstractBaseComponent
  implements OnInit, ISettingsRow
{
  @Input() profissionalDeRodeio: AdminProfissionalDeRodeio;

  @Output() deletedId = new EventEmitter<number>();
  @Output() rowChange = new EventEmitter<RowInfo>();

  @ViewChild('saveBtn') public saveBtn: SaveButtonComponent;

  constructor(
    private modalService: NgbModal,
    private toastService: ToastService,
    private profissionalAdminData: ProfissionaisDeRodeioAdminDataService,
    private dialogService: DialogService,
    private dateService: DateService
  ) {
    super();
  }

  ngOnInit() {}

  public isRowValid(): boolean {
    return (
      !!this.profissionalDeRodeio.contato.cpf &&
      !!this.profissionalDeRodeio.contato.nome &&
      !!this.profissionalDeRodeio.contato.sobrenome
    );
  }

  public onDelete(): void {
    this.dialogService
      .displayModal(
        DialogMessages.DELETE_CONFIRMATION,
        DialogTitles.CONFIRMATION,
        true
      )
      .pipe(
        concatMap((isYes) => {
          if (isYes === true) {
            return this.profissionalAdminData.delete(
              this.profissionalDeRodeio.id
            );
          } else {
            return of(false);
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((wasDeleted) => {
        if (wasDeleted === true) {
          // Let the parent component what id has been deleted
          this.deletedId.emit(this.profissionalDeRodeio.id);

          this.toastService.toasts.next({
            httpStatusCode: 200,
            header: 'Successo',
            body: 'Profissional de Rodeio deletado.',
            delay: 3000,
          });

          // Close modal
          this.modalService.dismissAll();
        }
      });
  }

  public onPreSave(): Observable<boolean> {
    return this.profissionalAdminData
      .update(this.profissionalDeRodeio)
      .pipe(takeUntil(this.destroy));
  }

  public onSaved(isUpdated: boolean): void {
    if (isUpdated === true) {
      this.toastService.toasts.next({
        httpStatusCode: 200,
        header: 'Successo',
        body: 'Mudanças foram salvas.',
        delay: 3000,
      });

      // Update save button
      this.onUpdateSaveBtn(true);
    }
  }

  public onUpdateSaveBtn(isSaved: boolean): void {
    if (!isSaved && this.profissionalDeRodeio && this.saveBtn) {
      this.saveBtn.changeSaveBtnState();
    }

    this.rowChange.emit({
      row: this.profissionalDeRodeio,
      isSaved,
      isValid: this.isRowValid(),
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true, size: 'xl' });
  }

  public getFormattedDate(date: any): string {
    return this.dateService.getFormattedDate(date);
  }
}
