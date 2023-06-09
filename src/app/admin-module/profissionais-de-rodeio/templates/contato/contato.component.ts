import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, distinctUntilChanged, map, of, Subject, takeUntil, tap } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { DddService } from 'src/app/shared/services/static/ddd.service';
import { SexoService } from 'src/app/shared/services/static/sexo.service';

import { Ddd } from '../../interfaces/ddd.interface';
import { Sexo } from '../../interfaces/sexo.interface';
import { AdminContato } from '../../models/admin-contato.model';
import { ContatoAdminDataService } from './data/contato-admin-data.service';
import { ContatoService } from './services/contato.service';

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
  public isCpfUnique: boolean;
  public isValidCpfFormat: boolean;

  constructor(
    private sexoService: SexoService,
    private dddService: DddService,
    private contatoAdminData: ContatoAdminDataService,
    private contatoService: ContatoService
  ) {
    super();

    this.sexos = this.sexoService.getSexos();
    this.ddds = this.dddService.getDdds();
  }

  ngOnInit(): void {
    this.setup();

    this.cpfText
      .pipe(
        distinctUntilChanged(),
        map((cpf) => this.contatoService.formatCPF(cpf)),
        tap(
          (formattedCpf) =>
            (this.isValidCpfFormat =
              this.contatoService.isValidCpfFormat(formattedCpf))
        ),
        concatMap((cpf) => {
          if (!!cpf && cpf.length === 14) {
            return this.contatoAdminData
              .isCpfUnique(
                cpf,
                this.adminContato.id > 0 ? this.adminContato.id : 0
              )
              .pipe(map((isCpfUnique) => ({ isCpfUnique, cpf })));
          } else {
            return of({ isCpfUnique: false, cpf });
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((x) => {
        if (this.isValidCpfFormat) {
          this.adminContato.cpf = x.cpf;
        }

        this.isCpfUnique = x.isCpfUnique;
      });
  }

  private setup(): void {
    // Set the initial to true if it's being edited.
    this.isCpfUnique = this.adminContato.id > 0;
    this.isValidCpfFormat = this.adminContato.id > 0;
  }

  public cpfContainNaN(cpf?: string): boolean {
    return this.contatoService.cpfContainNaN(cpf);
  }

  public onCpfInput(target: EventTarget | null): void {
    let cpfText: string = '';

    if (target) {
      cpfText = (<HTMLInputElement>target).value;
    }

    this.cpfText.next(cpfText);
  }

  public triggerCpfCheck(): void {
    this.cpfText.next(this.adminContato.cpf);
  }

  public onChange(): void {
    this.isValidCpfFormat = this.contatoService.isValidCpfFormat(
      this.contatoService.formatCPF(this.adminContato.cpf)
    );

    this.isValid.emit(
      this.isValidCpfFormat &&
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
