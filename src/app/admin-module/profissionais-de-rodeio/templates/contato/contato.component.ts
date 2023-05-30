import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, debounceTime, distinctUntilChanged, map, of, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { DddService } from 'src/app/shared/services/static/ddd.service';
import { SexoService } from 'src/app/shared/services/static/sexo.service';

import { Ddd } from '../../interfaces/ddd.interface';
import { Sexo } from '../../interfaces/sexo.interface';
import { AdminContato } from '../../models/admin-contato.model';
import { ContatoAdminDataService } from './data/contato-admin-data.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent extends AbstractBaseComponent implements OnInit {
  @Input() adminContato!: AdminContato;
  @Output() adminContatoChange = new EventEmitter<AdminContato>();

  @Output() isValid = new EventEmitter<boolean>();

  public cpfText = new Subject<string>();
  public ddds!: Array<Ddd>;
  public sexos!: Array<Sexo>;
  public dataDeNascimentoTouched: boolean;
  public isCpfUnique: boolean = false;

  constructor(
    private sexoService: SexoService,
    private dddService: DddService,
    private contatoAdminData: ContatoAdminDataService
  ) {
    super();

    this.sexos = this.sexoService.getSexos();
    this.ddds = this.dddService.getDdds();
  }

  ngOnInit(): void {
    // Set the initial to true if it's being edited.
    this.isCpfUnique = this.adminContato.id > 0;

    this.cpfText
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        map((cpf) => this.formatCPF(cpf)),
        concatMap((cpf) => {
          if (!!cpf && cpf.length > 0) {
            return this.contatoAdminData
              .isCpfUnique(cpf, this.adminContato.id > 0 ? this.adminContato.id : 0)
              .pipe(map((isCpfUnique) => ({ isCpfUnique, cpf })));
          } else {
            return of({ isCpfUnique: false, cpf });
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((x) => {
        this.adminContato.cpf = x.cpf;
        this.isCpfUnique = x.isCpfUnique;
      });
  }

  public formatCPF(cpf?: string): string {
    let formattedCpf = '';
    // CPF Format: 123.456.789-01
    if (!cpf) {
      return formattedCpf;
    }

    for (let i = 0; i < cpf.length; i++) {
      const value = cpf[i];

      if (value === '-' || value === '.') continue;

      formattedCpf += cpf[i];

      if (i === 10) {
        formattedCpf += '-';
      } else if (i === 2 || i === 6) {
        formattedCpf += '.';
      }
    }

    return formattedCpf;
  }

  public onCpfInput(target: EventTarget | null): void {
    let cpfText: string = '';

    if (target) {
      cpfText = (<HTMLInputElement>target).value;
    }

    this.cpfText.next(cpfText);
  }

  public onChange(): void {
    this.isValid.emit(
      !!this.adminContato.cpf &&
        this.adminContato.cpf.length === 14 &&
        !!this.adminContato.nome &&
        this.adminContato.nome.length > 0 &&
        !!this.adminContato.sobrenome &&
        this.adminContato.sobrenome.length > 0 &&
        !!this.adminContato.dataDeNascimento &&
        this.adminContato.sexoId > 0 &&
        this.isCpfUnique
    );
  }
}
