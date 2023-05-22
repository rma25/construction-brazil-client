import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { concatMap, Observable, of, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ISettingsRow } from 'src/app/shared/interfaces/ISettingsRow.interface';
import { RowInfo } from 'src/app/shared/interfaces/rowInfo.interface';
import { DialogMessages } from 'src/app/shared/modals/dialog/enums/dialog-messages';
import { DialogTitles } from 'src/app/shared/modals/dialog/enums/dialog-titles';
import { DialogService } from 'src/app/shared/modals/dialog/services/dialog.service';
import { SaveBtnState } from 'src/app/shared/save-button/enums/save-btn-state.enum';
import { SaveButtonComponent } from 'src/app/shared/save-button/save-button.component';
import { DateService } from 'src/app/shared/services/date.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionaisDeRodeioAdminDataService } from '../data/profissionais-de-rodeio-admin-data.service';
import { EditType } from '../enums/edit-type.enum';
import { AdminProfissionalDeRodeio } from '../models/admin-profissional-de-rodeio.model';
import { InformacoesGeraisService } from '../templates/services/informacoes-gerais.service';

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
  @Input() profissionalDeRodeio!: AdminProfissionalDeRodeio;

  @Output() deletedId = new EventEmitter<number>();
  @Output() rowChange = new EventEmitter<RowInfo>();

  @ViewChild('saveBtn') public saveBtn: SaveButtonComponent;

  public contatoEditType = EditType.CONTATO;
  public enderecoEditType = EditType.ENDERECO;
  public informacoesGeraisEditType = EditType.INFORMACOES_GERAIS;
  public editBtnClass: string;
  public isContatoValid: boolean = true;
  public isEnderecoValid: boolean = true;

  public changedState = SaveBtnState.CHANGED;
  public initialProfissionalDeRodeio = new AdminProfissionalDeRodeio();
  public dirty: boolean = false;

  constructor(
    public modalService: ModalService,
    private toastService: ToastService,
    private profissionalAdminData: ProfissionaisDeRodeioAdminDataService,
    private dialogService: DialogService,
    private dateService: DateService,
    private informacocesGeraisService: InformacoesGeraisService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initialProfissionalDeRodeio = JSON.parse(
      JSON.stringify(this.profissionalDeRodeio)
    );
  }

  public onRevertChanges(): void {
    this.profissionalDeRodeio = JSON.parse(
      JSON.stringify(this.initialProfissionalDeRodeio)
    );

    this.onUpdateSaveBtn(SaveBtnState.DEFAULT);

    this.dirty = false;
  }

  public showRevertChanges(): boolean {
    return this.dirty;
  }

  public isRowValid(): boolean {
    return this.isContatoValid && this.isEnderecoValid;
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
          this.modalService.closeModal();
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
      this.onUpdateSaveBtn(SaveBtnState.SAVED);
    }
  }

  private updateParent(isSaved: boolean): void {
    this.rowChange.emit({
      row: this.profissionalDeRodeio,
      isSaved,
      isValid: this.isRowValid(),
    });
  }

  public onUpdateSaveBtn(state: SaveBtnState): void {
    if (state === SaveBtnState.SAVED) {
      this.dirty = false;
      this.initialProfissionalDeRodeio = this.profissionalDeRodeio;

      this.updateParent(true);
    } else if (state === SaveBtnState.CHANGED) {
      this.dirty =
        this.profissionalDeRodeio !== this.initialProfissionalDeRodeio;

      this.updateParent(false);
    }

    this.saveBtn.changeSaveBtnState(state);
  }

  public getFormattedDate(date: any): string {
    return this.dateService.getFormattedDate(date);
  }

  public getEditMessage(editType: EditType): string {
    let message = 'Editar ';
    if (editType === EditType.CONTATO) {
      message += `${this.profissionalDeRodeio.contato.nome} ${this.profissionalDeRodeio.contato.sobrenome}`;
    } else if (editType === EditType.ENDERECO) {
      message += `${this.profissionalDeRodeio.endereco.cidade} ${this.profissionalDeRodeio.endereco.estado}`;
    } else if (editType === EditType.INFORMACOES_GERAIS) {
      message += `${this.informacocesGeraisService.getStatus(
        this.profissionalDeRodeio.ativo
      )} ${this.informacocesGeraisService.getClassificacao(
        this.profissionalDeRodeio.sindicalizado
      )}`;
    }
    return message;
  }

  public getEditBtnClass(): string {
    return `btn ${
      this.profissionalDeRodeio.ativo ? 'btn-primary' : 'btn-secondary'
    }`;
  }
}
