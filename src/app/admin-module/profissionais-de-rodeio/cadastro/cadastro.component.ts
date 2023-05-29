import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

import { ProfissionalAdminDataService } from '../data/profissional-admin-data.service';
import { AdminProfissional } from '../models/admin-profissional.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent extends AbstractBaseComponent implements OnInit {
  @Output() newProfissionalAdded =
    new EventEmitter<AdminProfissional>();

  public newProfissional = new AdminProfissional();
  public isContatoValid: boolean = false;
  public isEnderecoValid: boolean = false;

  constructor(
    public modalService: ModalService,
    private profissionalSettingsData: ProfissionalAdminDataService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.newProfissional = new AdminProfissional();
  }

  public isAddValid(): boolean {
    return this.isContatoValid && this.isEnderecoValid;
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
