import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionaisDeRodeioAdminDataService } from '../data/profissionais-de-rodeio-admin-data.service';
import { AdminProfissionalDeRodeio } from '../models/admin-profissional-de-rodeio.model copy';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent extends AbstractBaseComponent implements OnInit {
  @Output() newProfissionalAdded =
    new EventEmitter<AdminProfissionalDeRodeio>();

  public newProfissional = new AdminProfissionalDeRodeio();
  public estados = new Array<string>();

  constructor(
    public modalService: ModalService,
    private profissionalSettingsData: ProfissionaisDeRodeioAdminDataService,
    private toastService: ToastService,
    private staticDataService: StaticDataService
  ) {
    super();

    this.estados = this.staticDataService.getEstados();
  }

  ngOnInit(): void {
    this.newProfissional = new AdminProfissionalDeRodeio();
  }

  public isAddValid(): boolean {
    return (
      !!this.newProfissional.contato.cpf &&
      !!this.newProfissional.contato.nome &&
      !!this.newProfissional.contato.sobrenome
    );
  }

  public onAdd(): void {
    // Although isE2G is set to false, the only purpose is to notify the user
    this.newProfissional.criado = new Date();

    this.TestingOnly();

    // this.profissionalSettingsData
    //   .insert(this.newProfissional)
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe((newId) => {
    //     if (newId) {
    //       // Set the new Id from the database to the existing videos
    //       this.newProfissional.id = newId;

    //       this.newProfissionalAdded.emit(this.newProfissional);

    //       this.toastService.toasts.next({
    //         httpStatusCode: 200,
    //         header: 'Successo',
    //         body: 'Profissional de Rodeio criado.',
    //         delay: 3000,
    //       });
    //     }

    //     this.newProfissional = new AdminProfissionalDeRodeio();
    //   });

    this.modalService.closeModal();
  }

  // TODO: This is only until I have the server working
  public TestingOnly(): void {
    // Set the new Id from the database to the existing videos
    this.newProfissional.id = 2;

    this.newProfissionalAdded.emit(this.newProfissional);

    this.toastService.toasts.next({
      httpStatusCode: 200,
      header: 'Successo',
      body: 'Profissional de Rodeio criado.',
      delay: 3000,
    });
  }
}
