import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { concatMap, debounceTime, distinctUntilChanged, map, of, Subject, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';
import { ExternalCepDataService } from 'src/app/shared/data/external-cep-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

import { Estado } from '../../interfaces/estado.interface';
import { AdminEndereco } from '../../models/admin-endereco.model';
import { InformacoesGeraisService } from '../services/informacoes-gerais.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent extends AbstractBaseComponent implements OnInit {
  @Input() adminEndereco!: AdminEndereco;
  @Output() adminEnderecoChange = new EventEmitter<AdminEndereco>();

  @Output() isValid = new EventEmitter<boolean>(false);

  public estados!: Array<Estado>;
  public cepText = new Subject<string>();

  public isSindicalizado: boolean;

  constructor(
    private staticDataService: StaticDataService,
    private externalCepDataService: ExternalCepDataService,
    private informacoesGeraisService: InformacoesGeraisService
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: Implement call to get Estados

    this.informacoesGeraisService.isSindicalizado
      .pipe(takeUntil(this.destroy))
      .subscribe((isSindicalizado) => {
        this.isSindicalizado = isSindicalizado;
      });

    this.cepText
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        map((cep) => this.formatCEP(cep)),
        concatMap((formattedCep) => {
          if (formattedCep && formattedCep.length === 9) {
            return this.externalCepDataService
              .getCepInfo(formattedCep)
              .pipe(map((cepInfo) => ({ cepInfo, formattedCep })));
          } else {
            return of({ cepInfo: undefined, formattedCep });
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((x) => {
        if (x.cepInfo && !x.cepInfo.erro) {
          this.adminEndereco.cep = x.cepInfo.cep;
          this.adminEndereco.cidade = x.cepInfo.localidade;
          this.adminEndereco.complemento = x.cepInfo.complemento;
          this.adminEndereco.estadoId = this.getEstadoIdFor(x.cepInfo.uf)
          this.adminEndereco.rua = x.cepInfo.logradouro;
          this.adminEndereco.bairro = x.cepInfo.bairro;
        } else {
          this.adminEndereco.cep = x.formattedCep;
        }
      });
  }

  private getEstadoIdFor(uf: string): number {
    if (!this.estados || this.estados.length === 0 || !uf || uf.length === 0)
      return 0;

    const estadoFound = this.estados.find(
      (x) => x.uf.toLocaleLowerCase() === uf.toLocaleLowerCase()
    );

    if (!estadoFound) return 0;

    return estadoFound.id;
  }

  public formatCEP(cpf?: string): string {
    let formattedCpf = '';
    // CPF Format: 123.456.789-01
    if (!cpf) {
      return formattedCpf;
    }

    for (let i = 0; i < cpf.length; i++) {
      const value = cpf[i];

      if (value === '-' || value === '.') continue;

      formattedCpf += cpf[i];

      if (i === 4) {
        formattedCpf += '-';
      }
    }

    return formattedCpf;
  }

  public onCepInput(target: EventTarget | null): void {
    let cepText: string = '';

    if (target) {
      cepText = (<HTMLInputElement>target).value;
    }

    this.cepText.next(cepText);
  }

  public hideAddressForm(): boolean {
    return !this.adminEndereco.cep || this.adminEndereco.cep.length !== 9;
  }

  public onChange(): void {
    this.isValid.emit(
      !!this.adminEndereco.cep && this.adminEndereco.cep.length === 9
    );
  }
}
