import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { concatMap, Observable, of, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { BtnClass } from 'src/app/shared/enums/btn-class.enum';
import { ISettingsRow } from 'src/app/shared/interfaces/ISettingsRow.interface';
import { RowInfo } from 'src/app/shared/interfaces/rowInfo.interface';
import { DialogMessages } from 'src/app/shared/modals/dialog/enums/dialog-messages';
import { DialogTitles } from 'src/app/shared/modals/dialog/enums/dialog-titles';
import { DialogService } from 'src/app/shared/modals/dialog/services/dialog.service';
import { SaveBtnState } from 'src/app/shared/save-button/enums/save-btn-state.enum';
import { SaveButtonComponent } from 'src/app/shared/save-button/save-button.component';
import { DateService } from 'src/app/shared/services/date.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { EstadoService } from 'src/app/shared/services/static/estado.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionalAdminDataService } from '../data/profissional-admin-data.service';
import { EditType } from '../enums/edit-type.enum';
import { AdminProfissional } from '../models/admin-profissional.model';
import { InformacoesGeraisService } from '../templates/informacoes-gerais/services/informacoes-gerais.service';

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
  @Input() adminProfissional!: AdminProfissional;

  @Output() deletedId = new EventEmitter<number>();
  @Output() rowChange = new EventEmitter<RowInfo>();

  @ViewChild('saveBtn') public saveBtn: SaveButtonComponent;

  public contatoEditType = EditType.CONTATO;
  public enderecoEditType = EditType.ENDERECO;
  public informacoesGeraisEditType = EditType.INFORMACOES_GERAIS;
  public editBtnClass: string;
  public isContatoValid: boolean = true;
  public isEnderecoValid: boolean = true;
  public isInformacoesGeraisValid: boolean = true;
  public isContatoChanged: boolean = false;
  public isEnderecoChanged: boolean = false;
  public isInformacoesGeraisChanged: boolean = false;

  public changedState = SaveBtnState.CHANGED;
  public initialProfissionalDeRodeio = new AdminProfissional();
  public dirty: boolean = false;

  constructor(
    public modalService: ModalService,
    private toastService: ToastService,
    private profissionalAdminData: ProfissionalAdminDataService,
    private dialogService: DialogService,
    private dateService: DateService,
    private informacocesGeraisService: InformacoesGeraisService,
    private estadoService: EstadoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initialProfissionalDeRodeio = JSON.parse(
      JSON.stringify(this.adminProfissional)
    );
  }

  public onRevertChanges(): void {
    this.adminProfissional = JSON.parse(
      JSON.stringify(this.initialProfissionalDeRodeio)
    );

    this.onUpdateSaveBtn(SaveBtnState.DEFAULT);

    this.dirty = false;
    this.isContatoChanged = false;
    this.isEnderecoChanged = false;
    this.isInformacoesGeraisChanged = false;
  }

  public showRevertChanges(): boolean {
    return this.dirty;
  }

  public isRowValid(): boolean {
    return (
      this.isContatoValid &&
      this.isEnderecoValid &&
      this.isInformacoesGeraisValid
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
              this.adminProfissional.id
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
          this.deletedId.emit(this.adminProfissional.id);

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
      .update(this.adminProfissional)
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
      row: this.adminProfissional,
      isSaved,
      isValid: this.isRowValid(),
    });
  }

  public onUpdateSaveBtn(state: SaveBtnState): void {
    if (state === SaveBtnState.SAVED) {
      this.dirty = false;
      this.initialProfissionalDeRodeio = this.adminProfissional;

      this.updateParent(true);
    } else if (state === SaveBtnState.CHANGED) {
      this.dirty =
        this.adminProfissional !== this.initialProfissionalDeRodeio;

      this.updateParent(false);
    }

    if (this.saveBtn) this.saveBtn.changeSaveBtnState(state);
  }

  public getFormattedDate(date: any): string {
    return this.dateService.getFormattedDate(date);
  }

  public getEditMessage(editType: EditType): string {
    let message = 'Editar ';

    if (editType === EditType.CONTATO) {
      message += this.getProfissionalFullname();
    } else if (editType === EditType.ENDERECO) {
      if (this.adminProfissional.endereco.cidade) {
        message += `${this.adminProfissional.endereco.cidade} `;
      }

      const estadoFound = this.estadoService.find(this.adminProfissional.endereco.estadoId);

      if (estadoFound) {
        message += `${estadoFound.uf} `;
      }
    } else if (editType === EditType.INFORMACOES_GERAIS) {
      message += `${this.informacocesGeraisService.getStatus(
        this.adminProfissional.ativo
      )} ${this.informacocesGeraisService.getClassificacao(
        this.adminProfissional.sindicalizado
      )}`;
    }
    return message;
  }

  public getEditBtnClass(editType: EditType): string {
    let btnClass = 'btn ';
    if (editType === EditType.CONTATO) {
      if (this.isContatoChanged && this.dirty) {
        btnClass += `${
          this.adminProfissional.ativo
            ? BtnClass.CHANGED_ACTIVE
            : BtnClass.CHANGED_INACTIVE
        }`;
      } else {
        btnClass += `${
          this.adminProfissional.ativo ? BtnClass.DEFAULT : BtnClass.INACTIVE
        }`;
      }
    } else if (editType === EditType.ENDERECO) {
      if (this.isEnderecoChanged && this.dirty) {
        btnClass += `${
          this.adminProfissional.ativo
            ? BtnClass.CHANGED_ACTIVE
            : BtnClass.CHANGED_INACTIVE
        }`;
      } else {
        btnClass += `${
          this.adminProfissional.ativo ? BtnClass.DEFAULT : BtnClass.INACTIVE
        }`;
      }
    } else if (editType === EditType.INFORMACOES_GERAIS) {
      if (this.isInformacoesGeraisChanged && this.dirty) {
        btnClass += `${
          this.adminProfissional.ativo
            ? BtnClass.CHANGED_ACTIVE
            : BtnClass.CHANGED_INACTIVE
        }`;
      } else {
        btnClass += `${
          this.adminProfissional.ativo ? BtnClass.DEFAULT : BtnClass.INACTIVE
        }`;
      }
    }

    return btnClass;
  }

  public getProfissionalFullname(): string {
    let fullname = '';

    if (this.adminProfissional.contato.nome) {
      fullname += `${this.adminProfissional.contato.nome} `;
    }

    if (this.adminProfissional.contato.sobrenome) {
      fullname += `${this.adminProfissional.contato.sobrenome} `;
    }

    return fullname;
  }
}
